import { Injectable } from '@angular/core';
import { AuthenticationService } from '../firebase/authentication/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFireDatabase,
    private fire: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.enableDisableMessageItems();
        this.autoSignOut();
      }
    });
  }

  public enableImageSend: boolean;
  public enableForm: boolean;
  public enableFavorite: boolean;
  public enableTimeline: boolean;
  public totalMessages = 40;
  public showDirectRoute = false;
  public showImages = true;
  public showText = true;
  private enableDisableMessageItems() {
    this.fire
      .collection('rules')
      .doc('messages').valueChanges()
      .subscribe({
        next: (docSnapshot: any) => {
          this.enableForm = docSnapshot.enableForm;
          this.enableFavorite = docSnapshot.enableFavorite;
          this.enableImageSend = docSnapshot.enableImageSend;
          this.showImages = docSnapshot.showImages;
          this.enableTimeline = docSnapshot.enableTimeline;
          this.totalMessages = docSnapshot.totalMessages ?? 40;
          this.showDirectRoute = docSnapshot.showDirectRoute ?? false;
          this.showText = docSnapshot.showText;
        }
      });
  }

  private enableDisableImages() {
    this.db
      .object('admin/messages/images')
      .valueChanges()
      .subscribe(s => (this.enableImageSend = s as boolean));
  }

  private enableDisableFavorites() {
    this.db
      .object('admin/messages/favorites')
      .valueChanges()
      .subscribe(s => (this.enableFavorite = s as boolean));
  }

  private enableDisableForm() {
    this.db
      .object('admin/messages/form')
      .valueChanges()
      .subscribe(s => (this.enableForm = s as boolean));
  }

  private autoSignOut() {
    this.fire
      .collection('rules')
      .doc('system')
      .valueChanges()
      .subscribe({
        next: (docSnapshot: any) => {
          if (docSnapshot.signOut) {
            this.auth.signOut();
          }
        }
      });

    // this.db
    //   .object('admin/sistema/signOut')
    //   .valueChanges()
    //   .subscribe(s => {
    //     console.log(s);
    //     if (s) {
    //       this.auth.signOut();
    //     }
    //   });
  }
}
