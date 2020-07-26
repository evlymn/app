// import { LabelsService } from './../shared/services/labels/labels.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/firebase/authentication/authentication.service';
import { AnalyticsService } from '../shared/services/firebase/analytics/analytics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  mobileQuery: MediaQueryList;
  user = null;
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private auth: AuthenticationService,
    private analyticsService: AnalyticsService,
    // private labelsService: LabelsService
  ) {
    this.authSubscription = this.auth.authState.subscribe({
      next: (user) => {
        this.user = user;
      },
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  // private getLabels() {
  //   this.labelsService.getLabels().subscribe({
  //     next: (doc) => {
  //       // this.labelLogging = doc.data().logging;
  //       // this.labelChoose = doc.data().chooseLogin;
  //     }
  //   });
  // }

  exit() {
    this.auth.signOut().then(() => {
      this.analyticsService.eventSignOut();
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.authSubscription.unsubscribe();
  }
}
