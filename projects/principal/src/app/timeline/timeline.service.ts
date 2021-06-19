import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Message as Message} from './interfaces/message';
import {StorageService} from '../shared/services/firebase/storage/storage.service';
import {AuthenticationService} from '../shared/services/firebase/authentication/authentication.service';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {AdminService} from '../shared/services/admin/admin.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  messagesPath = 'messages/timeline';
  currentUser: firebase.User;
  requestId = null;
  privatesRoute = false;
  commentsRoute = false;
  profileRoute = false;
  isSameUser = false;

  constructor(
    private db: AngularFireDatabase,
    private storage: StorageService,
    private auth: AuthenticationService,
    public admin: AdminService
  ) {
    this.auth.authState.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  }

  updateMessageText(id: string, text: string) {
    return this.db.database.ref('messages/timeline/' + id).update({
      text: text.replace(/\n/g, '<br />'),
    });
  }

  deleteMessage(id: string) {
    return this.db.database.ref('messages/timeline/' + id).remove();
  }

  setSameUser(uid: string) {
    this.isSameUser = uid ? uid === this.currentUser.uid : true;
  }

  createPushId() {
    return this.db.createPushId();
  }

  async createMessage(pushId: string, text: string, imageURL?: string) {
    const message = {
      text: this.commentsRoute ? text : text.replace(/\n/g, '<br />'),
      time: new Date().getTime(),
      uid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      imageURL: imageURL ? imageURL : null,
      id: pushId,
    };
    if (this.privatesRoute) {
      await this.db.database
        .ref(`messages/private_calls/${this.requestId}/${this.currentUser.uid}`)
        .update({
          time: new Date().valueOf(),
        });
    }
    return await this.db.database
      .ref(this.messagesPath)
      .child(pushId)
      .set(message);
  }

  getProfileMessages(id: string) {
    this.messagesPath = 'messages/by_user/' + id;
    return this.db
      .list<Message>('messages/by_user/' + id, (ref) =>
        ref.orderByChild('verified').equalTo(true).limitToLast(50)
      )
      .valueChanges();
  }

  getPrivateMessages(path: string = null) {
    this.messagesPath = path;
    return this.db
      .list<Message>(path, (ref) => ref.limitToLast(50))
      .valueChanges();
  }

  getTimelineMessages() {
    this.messagesPath = 'messages/timeline';
    return this.db
      .list<Message>('messages/timeline', (ref) =>
        ref.orderByChild('verified').equalTo(true).limitToLast(100)
      )
      .valueChanges();
  }

  async getUserInfo(uid: string) {
    const userInfo = await this.db.database.ref('users/' + uid).once('value');
    return userInfo.val().user;
  }

  async addImage(pushId: string, image: string, name: string) {
    const file = await this.storage.base64ToFile(image, name, {
      type: 'image/jpeg',
    });

    const uploadTask = (this.storage.upload(`messages/${pushId}`, file, {
      cacheControl: 'public, max-age=31536000', customMetadata: {
        uid: this.auth.currentUser.uid,
        displayName: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email,
        id: pushId
      }
    }) as unknown) as AngularFireUploadTask;
    return {pushId, uploadTask};
  }

  async checkMessagesCollectionPath(guestUid: any) {
    let privatePath = null;
    let privateSnapShot = await this.db.database
      .ref(`messages/private_timeline/${this.currentUser.uid}-${guestUid}`)
      .once('value');
    if (privateSnapShot.exists()) {
      privatePath = `messages/private_timeline/${this.currentUser.uid}-${guestUid}`;
    } else {
      privateSnapShot = await this.db.database
        .ref(`messages/private_timeline/${guestUid}-${this.currentUser.uid}`)
        .once('value');
      if (privateSnapShot.exists()) {
        privatePath = `messages/private_timeline/${guestUid}-${this.currentUser.uid}`;
      }
    }
    if (!privatePath) {
      this.checkCreatePrivate(
        guestUid,
        this.currentUser,
        `messages/private_timeline/${this.currentUser.uid}-${guestUid}`
      );
    }
    privatePath = privatePath
      ? privatePath
      : `messages/private_timeline/${this.currentUser.uid}-${guestUid}`;
    return privatePath;
  }

  async checkCreatePrivate(
    guestUid: any,
    currentUser: any,
    path: string
  ) {
    const guest = await this.getUserInfo(guestUid);
    const snapshot = await this.db.database
      .ref('messages/private_calls/' + currentUser.uid)
      .orderByChild('uid')
      .equalTo(guestUid)
      .once('value');
    if (!snapshot.exists()) {
      if (guestUid !== currentUser.uid) {
        await this.createPrivate(guest, currentUser, path);
        await this.createPrivate(currentUser, guest, path);
      }
    }
  }

  async createPrivate(guestUid: any, currentUser: any, path: string) {
    let guest: any;
    if (typeof guestUid === 'string') {
      guest = await this.getUserInfo(guestUid);
    } else {
      guest = guestUid;
    }
    return await this.db.database
      .ref('messages/private_calls/' + currentUser.uid)
      .child(guest.uid)
      .set({
        photoURL: guest?.photoURL,
        displayName: guest?.displayName,
        uid: guest.uid,
        time: new Date().valueOf(),
        path,
      })
      .catch((err) => console.error(err));
  }

  async addComment(id: string, comment: string) {
    return this.db.database.ref('messages/comments/' + id).push({
      comment,
      time: new Date().valueOf(),
      displayName: this.auth.currentUser.displayName,
      id,
      uid: this.auth.currentUser.uid,
      photoURL: this.auth.currentUser.photoURL,
    });
  }

  getComments(id: string) {
    this.messagesPath = 'messages/comments/' + id;
    return this.db.list('messages/comments/' + id).valueChanges();
  }

  getTotalComments(id: string) {
    return this.db
      .list('messages/comments/' + id)
      .valueChanges(['child_added', 'child_removed']);
  }
}
