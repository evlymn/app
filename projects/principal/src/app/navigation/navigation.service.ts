import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private db: AngularFireDatabase) { }

  getPrivateCalls(uid: string) {
    return this.db.database.ref(
      'messages/private_calls/' + uid
    );
  }
}
