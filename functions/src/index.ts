import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp(functions.config().firebase);



// export const deleteUsers = functions.firestore.document("admin/system/delete_users")
//   .onUpdate((snapshot, _) => {
//     if (snapshot.after.data().action === "delete") {
//       deleteAuthUsers();
//     }
//     return true;
//   });

// function deleteAuthUsers() {
//   let uid: string;
//   admin
//     .auth()
//     .listUsers()
//     .then((result) => {
//       for (const user of result.users) {
//         uid = user.uid;
//         admin
//           .auth()
//           .deleteUser(user.uid)
//           .catch(err => console.error(uid, err));
//       }
//     })
//     .catch((err) => console.error("listUsers", err));
// }






export const timelineCreate = functions.database.ref("messages/timeline/{key}").onCreate((snapshot, _) => {
  const message = snapshot.val();
  const key = snapshot.key;
  denormalizeMessages(key, message);
  checkMessage(key, message).catch((err) => console.log(err));
  return true;
});

function createDbRef(path: string) {
  return admin.app().database().ref(path);
}

export const timelineDelete = functions.database.ref("messages/timeline/{key}").onDelete(async (snapshot, _) => {
  const message = snapshot.val();
  const key = snapshot.key;
  await deleteDenormalizeMessages(key, message.uid);
  deleteStorageFile(key);

  return true;
});

async function deleteDenormalizeMessages(key: string, uid: string) {
  await createDbRef(`messages/by_content/only_image/${key}`).remove();
  await createDbRef(`messages/comments/${key}`).remove();
  await createDbRef(`messages/by_content/only_text/${key}`).remove();
  await createDbRef(`messages/by_user/${uid}/${key}`).remove();
  createDbRef("user/" + uid)
    .once("value", async (ref) => {
      const provider = (ref.val().providerId as string).replace(".", "_");
      await createDbRef(`messages/by_provider/${provider}/${key}`).remove();
    })
    .catch((err) => console.log(err));
}

function deleteStorageFile(key: string) {
  if (admin.storage().bucket().file('messages/' + key).exists()) {
    admin.storage().bucket().file('messages/' + key).delete().catch(err => console.log(err));
  }
}

export const timelineUpdate = functions.database.ref("messages/timeline/{key}").onUpdate((snapshot, _) => {
  const message = snapshot.after.val();
  const key = snapshot.after.key;
  denormalizeMessages(key, message);
  return true;
});


function denormalizeMessages(key: string, message: any) {
  createMessageByContent(key, message);
  createMessageByProvider(key, message);
  createMessageByUser(key, message);
}

function createMessageByUser(key: string, message: any) {
  createDbRef(`messages/by_user/${message.uid}/${key}`)
    .set(message)
    .catch((err) => console.error("createMessageByUser", err));
}

async function checkMessage(key: string, message: any) {
  if (!message.verified) {
    const phrases = await createDbRef("bad_words/phrases").once("value");
    let newMessage = message.text;

    phrases.forEach((p) => {
      const regExp = new RegExp(eval("/" + p.val().phrase + "/gi"));
      newMessage = newMessage.replace(
        regExp,
        p.val().replace ? p.val().replace : " ***** "
      );
    });

    const words = await createDbRef("bad_words/words").once("value");

    words.forEach((p) => {

      const regExp = new RegExp(eval("/" + p.val().word + "/gi"));
      newMessage = newMessage.replace(
        regExp,
        p.val().replace ? p.val().replace : " ***** "
      );
    });

    createDbRef(`messages/timeline/${key}`)
      .update({ text: newMessage, verified: true })
      .catch((err) => console.error(err));
  }
}

function createMessageByContent(key: string, message: any) {
  const imageURL = message.imageURL ? true : false;
  const text = message.text?.trim().length > 0 ? true : false;
  if (imageURL && !text) {
    createDbRef(`messages/by_content/only_image/${key}`)
      .set(message)
      .catch((err) => console.error("createMessageByContent", err));
  } else if (!imageURL && text) {
    createDbRef(`messages/by_content/only_text/${key}`)
      .set(message)
      .catch((err) => console.error("createMessageByContent", err));
  }
}

function createMessageByProvider(key: string, message: any) {
  createDbRef("users/" + message.uid)
    .once("value", (ref) => {
      const provider = (ref.val().providerId as string).replace(".", "_");
      createDbRef(`messages/by_provider/${provider}/${key}`)
        .set(message)
        .catch((err) => console.error("messages " + provider, err));
    })
    .catch((err) => console.error("createMessageByProvider", err));
}

// export const addMensagem = functions.https.onRequest((request, response) => {
//   const msg = {
//     message: request.query.message,
//     time: new Date().getTime(),
//     uid: "addmensagem",
//     nome: "Cloud Function",
//     foto:
//       "https://s3-us-west-2.amazonaws.com/assets.blog.serverless.com/google-cloud-functions.png",
//     urlImagem: request.query.url ? request.query.url : null,
//   };
//   adicionarMensagem(msg);

//   response.send(msg);
// });

// function adicionarMensagem(message: any) {
//   createDbRef("messages/timeline/").push(message);
// }

// export const obterUserInfo = functions.https.onRequest(
//   async (request, response) => {
//     corsHandler(request, response, async () => {
//       const uid = request.query.uid as string;
//       const user = await admin.auth().getUser(uid);
//       response.send({
//         photoURL: user?.photoURL,
//         displayName: user?.displayName,
//         email: user?.email,
//         uid,
//       });
//     });
//   }
// );


export const checkUsers = functions.https.onRequest((_, response) => {
  admin
    .auth()
    .listUsers()
    .then(async (result) => {
      for (const user of result.users) {
        const users = await admin.database().ref('users/' + user.uid).once('value');
        admin.database().ref('users/' + user.uid).set({
          additionalUserInfo: users.val(), user: {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
          }
        }).catch((err) => console.error(err));
      }
    }).catch((err) => console.error(err));

  response.send(true);
});



export const checkMessagesVerified = functions.https.onRequest(async (_, response) => {
  const messages = await admin.database().ref('messages/timeline').once('value');
  messages.forEach((message) => {
    message.ref.update({
      verified: true
    }).catch(err => console.log(err))
  })
  response.send(true);
});
