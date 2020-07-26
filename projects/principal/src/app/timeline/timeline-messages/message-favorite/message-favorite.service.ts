import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class MessageFavoriteService {
  favoritesRef = null;
  constructor(private realtime: AngularFireDatabase) {
    this.favoritesRef = this.realtime.database.ref('messages/favorites');
  }

  async setFavorite(messageId: string, userId: string, displayName: string) {
    const snapshot = await this.getFavoriteChildRef(messageId, userId).once(
      'value'
    );
    if (!snapshot.exists()) {
      return this.createFavorite(messageId, userId, displayName);
    } else {
      return this.removeFavorite(messageId, userId);
    }
  }

  async createFavorite(messageId: string, userId: string, displayName: string) {
    return this.getFavoriteChildRef(messageId, userId).set({ uid: userId, displayName, time: new Date().valueOf() });
  }

  async removeFavorite(messageId: string, userId: string) {
    return this.getFavoriteChildRef(messageId, userId).remove();
  }

  getFavoriteChildRef(messageId: string, userId: string) {
    return this.favoritesRef
      .child(messageId)
      .child(userId);
  }

  getTotalFavorites(messageId: string) {
    return this.realtime
      .list(`messages/favorites/${messageId}`)
      .valueChanges(['child_added', 'child_removed']);
  }
}
