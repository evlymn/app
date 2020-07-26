import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MessageFavoriteService } from './message-favorite.service';
import { AuthenticationService } from '../../../shared/services/firebase/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-favorite',
  templateUrl: './message-favorite.component.html',
  styleUrls: ['./message-favorite.component.scss'],
})
export class MessageFavoriteComponent implements OnInit, OnDestroy {
  @Input() messageId: string;
  totalFavoritesSubscription: Subscription;
  authSubscription: Subscription;
  totalFavorites = '';
  currentUserUid = '';
  badgeColor = '';

  displayName = '';
  matIconClass = 'favorite';
  constructor(
    private messageFavoriteService: MessageFavoriteService,
    private auth: AuthenticationService
  ) {
    this.authSubscription = this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.currentUserUid = user?.uid;
          this.displayName = user?.displayName;
          this.getTotalFavorites();
        }
      },
    });
  }

  getTotalFavorites() {
    this.totalFavoritesSubscription = this.messageFavoriteService
      .getTotalFavorites(this.messageId)
      .subscribe({
        next: (result) => {
          if (result.length > 0) {
            this.badgeColor = 'warn';
            this.matIconClass = '';
            this.totalFavorites = result.length.toString();
          } else {
            this.badgeColor = '';
            this.totalFavorites = '';
            this.matIconClass = 'favorite';
          }
        },
      });
  }

  setFavorite(e: any) {
    e.preventDefault();
    this.messageFavoriteService.setFavorite(
      this.messageId,
      this.currentUserUid,
      this.displayName
    );
  }

  ngOnInit(): void { }
  ngOnDestroy() {
    this.totalFavoritesSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }
}
