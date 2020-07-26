import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private fire: AngularFirestore) { }

  getLabels() {
    return this.fire.doc('system/labels/').get();
  }
}
