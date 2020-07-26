import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication/authentication.service';
import { NavigationService } from '../navigation.service';
import 'moment/locale/pt-br';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-privates',
  templateUrl: './navigation-privates.component.html',
  styleUrls: ['./navigation-privates.component.scss'],
})
export class NavigationPrivatesComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  privateCalls = [];
  constructor(
    private auth: AuthenticationService,
    private navService: NavigationService
  ) {
    this.authSubscription = this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.getPrivateCalls(user.uid);
        } else {
          this.authSubscription.unsubscribe();
        }
      },
    });
  }

  getPrivateCalls(uid: string) {
    this.navService
      .getPrivateCalls(uid)
      .orderByChild('time')
      .on('value', (snapshot) => {
        this.privateCalls = [];
        snapshot.forEach((element: any) => {
          this.privateCalls.push(element.val());
        });
        this.privateCalls = this.privateCalls.sort((a, b) => b.time - a.time);
      });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
