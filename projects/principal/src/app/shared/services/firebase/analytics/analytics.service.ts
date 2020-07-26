import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private analytics: AngularFireAnalytics) {}

  eventLog(eventName: string, params: any = null) {
    this.analytics.logEvent(eventName, params);
  }
  eventLogin() {
    this.analytics.logEvent('login');
  }

  setUserId(uid: string) {
    this.analytics.setUserId(uid);
  }

  setUserProperties(userCredential: firebase.auth.UserCredential) {
    this.analytics.setUserProperties({
      providerId: userCredential.additionalUserInfo.providerId,
      username: userCredential.additionalUserInfo.username,
      isNewUser: userCredential.additionalUserInfo.isNewUser,
    });
  }

  eventSignOut() {
    this.analytics.logEvent('signOut');
  }
}
