import { Component, OnInit, Input } from '@angular/core';
import 'moment/locale/pt-br';
import { TimelineService } from '../timeline.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackbarDeleteComponent } from './message-snackbar-delete/message-snackbar-delete.component';
import { MessageFavoriteService } from './message-favorite/message-favorite.service';

@Component({
  selector: 'app-timeline-messages',
  templateUrl: './timeline-messages.component.html',
  styleUrls: ['./timeline-messages.component.scss'],
})
export class TimelineMessagesComponent implements OnInit {
  @Input() message: any;
  @Input() showFavorites: boolean;
  @Input() currentUser: any;
  fullText = false;
  totalComments = null;
  lastComment = null;
  update = false;
  commentUpdate = null;
  constructor(
    public timelineService: TimelineService,
    private snackBar: MatSnackBar,
    private messageFavoriteService: MessageFavoriteService
  ) {  }

  showFullText() {
    this.fullText = !this.fullText;
  }

  getTotalComments() {
    this.timelineService.getTotalComments(this.message.id).subscribe({
      next: comment => {
        this.totalComments = comment.length > 0 ? comment.length : '';
        this.lastComment = comment[comment.length - 1];
      },
    });
  }

  deleteMessage() {
    this.snackBar.openFromComponent(MessageSnackbarDeleteComponent, {
      duration: 33333,
      data: this.message.id
    });
  }

  favoriteMessage() {
    this.messageFavoriteService.setFavorite(
      this.message.id,
      this.timelineService.currentUser.uid,
      this.timelineService.currentUser.displayName
    );
  }

  textKeyUp(textAreaEvent: any) {
    this.message.text = textAreaEvent.target.value;
  }
  cancelUpdate() {
    this.update = false;
  }

  openUpdateMessage() {
    this.update = true;
  }

  updateMessage() {
    this.timelineService
      .updateMessageText(this.message.id, this.message.text)
      .then(() => {
        this.update = false;
      });
  }

  ngOnInit(): void {
    this.getTotalComments();
  }
}
