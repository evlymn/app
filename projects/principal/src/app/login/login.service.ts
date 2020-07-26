import { Injectable } from '@angular/core';
import { AuthenticationService } from '../shared/services/firebase/authentication/authentication.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AnalyticsService } from '../shared/services/firebase/analytics/analytics.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private auth: AuthenticationService,
    private db: AngularFireDatabase,
    private analyticsService: AnalyticsService
  ) { }

  async loginGoogle(): Promise<{ ok: boolean; error: any }> {
    try {
      const credentials = await this.auth.signInWithGoogleAuthProvider();
      await this.setAnalyticsData(credentials);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async loginGitHub(): Promise<{ ok: boolean; error: any }> {
    try {
      const credentials = await this.auth.signInWithGithubAuthProvider();
      await this.setAnalyticsData(credentials);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async setAnalyticsData(credentials: firebase.auth.UserCredential) {
    this.analyticsService.setUserId(credentials.user.uid);
    this.analyticsService.setUserProperties(credentials);
    this.analyticsService.eventLogin();
    return await this.setUser(credentials);
  }

  async setUser(
    credentials: firebase.auth.UserCredential
  ): Promise<boolean> {
    try {
      await this.db.database
        .ref('users')
        .child(credentials.user.uid)
        .set({
          additionalUserInfo: credentials.additionalUserInfo, user: {
            email: credentials.user.email,
            displayName: credentials.user.displayName,
            photoURL: credentials.user.photoURL,
            uid: credentials.user.uid
          }
        });
      return true;
    } catch {
      return false;
    }
  }
}
