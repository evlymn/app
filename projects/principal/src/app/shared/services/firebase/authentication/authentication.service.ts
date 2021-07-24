import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: firebase.User;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.onAuthStateChanged();
    this.getCurrentUser();

  }

  private onAuthStateChanged() {

    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.ngZone.run(() => {
          this.router.navigate(['']).catch(reason => console.log(reason));
        });
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['login']).catch(reason => console.log(reason));
        });
      }
    });
  }

  public get authState(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }

  getCurrentUser() {
    return this.angularFireAuth.currentUser.then(user => this.currentUser = user);
  }

  signInWithGoogleAuthProvider(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithFacebookAuthProvider(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGithubAuthProvider(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );
  }

  signInWithTwitterAuthProvider(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }

  signOut() {
    return this.angularFireAuth.signOut();
  }
}
