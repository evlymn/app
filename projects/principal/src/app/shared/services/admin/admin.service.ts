import { Injectable } from '@angular/core';
import { AuthenticationService } from '../firebase/authentication/authentication.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import {AdminRules} from './interfaces/admin-rules';

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
      .collection<AdminRules[]>('rules')
      .doc<AdminRules>('messages').valueChanges()
      .subscribe({
        next: (rules) => {
          this.enableForm = rules.enableForm;
          this.enableFavorite = rules.enableFavorite;
          this.enableImageSend = rules.enableImageSend;
          this.showImages = rules.showImages;
          this.enableTimeline = rules.enableTimeline;
          this.totalMessages = rules.totalMessages ?? 40;
          this.showDirectRoute = rules.showDirectRoute ?? false;
          this.showText = rules.showText;
        }
      });
  }

  // noinspection JSUnusedLocalSymbols
  private enableDisableImages() {
    this.db
      .object('admin/messages/images')
      .valueChanges()
      .subscribe(s => (this.enableImageSend = s as boolean));
  }

  // noinspection JSUnusedLocalSymbols
  private enableDisableFavorites() {
    this.db
      .object('admin/messages/favorites')
      .valueChanges()
      .subscribe(s => (this.enableFavorite = s as boolean));
  }

  // noinspection JSUnusedLocalSymbols
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
            this.auth.signOut().catch(reason => console.log(reason));
          }
        }
      });
  }
}
