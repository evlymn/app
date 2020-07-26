import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/services/firebase/authentication/authentication.service';
import { TimelineService } from './timeline.service';
import 'moment/locale/pt-br';
import { Subscription } from 'rxjs';
import { Message } from './interfaces/message';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  messagesSubscription: Subscription;
  commentsSubscription: Subscription;
  user = null;
  messages: Message[];
  comments: any;
  id = null;
  totalMessages = 0;
  totalComments = 0;
  layout = [];

  constructor(
    private auth: AuthenticationService,
    public timeLineService: TimelineService,
    private route: ActivatedRoute
  ) {
    this.authSubscription = this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.user = user.photoURL;
          this.initTimeLine();
        } else {
          this.authSubscription?.unsubscribe();
          this.messagesSubscription?.unsubscribe();
        }
      },
    });
  }

  initTimeLine() {
    this.timeLineService.messagesPath = null;
    this.id = this.route.snapshot.paramMap.get('id');
    this.timeLineService.setSameUser(this.id);
    this.checkRoute();
    this.getItemsByRoute();
  }

  checkRoute() {
    this.timeLineService.profileRoute =
      this.route.snapshot.url[0]?.path.includes('profile') ?? false;
    this.timeLineService.privatesRoute =
      this.route.snapshot.url[0]?.path.includes('privates') ?? false;
    this.timeLineService.commentsRoute =
      this.route.snapshot.url[0]?.path.includes('comments') ?? false;
  }

  getMessagesAndSetLayout(messages: Message[]) {
    this.messages = messages;
    this.totalMessages = messages.length;
    this.setLayout(10, messages);
  }

  setLayout(total: number, items: any) {
    if (total - items.length > 0) {
      this.layout = new Array(total - items.length);
    }
  }

  getCommentsAndSetLayout(comments: any) {
    this.comments = comments;
    this.totalComments = comments.length;
    this.setLayout(12, comments);
  }

  async getItemsByRoute() {
    if (this.timeLineService.profileRoute) {
      this.messagesSubscription = this.timeLineService
        .getProfileMessages(this.id)
        .subscribe({
          next: (messages) => {
            this.getMessagesAndSetLayout(messages);
          },
        });
    } else if (this.timeLineService.privatesRoute) {
      this.timeLineService.requestId = this.id;
      const path = await this.timeLineService.checkMessagesCollectionPath(
        this.id
      );
      this.messagesSubscription = this.timeLineService
        .getPrivateMessages(path)
        .subscribe({
          next: (messages) => {
            this.getMessagesAndSetLayout(messages);
          },
        });
    } else if (this.timeLineService.commentsRoute) {
      this.commentsSubscription = this.timeLineService
        .getComments(this.id)
        .subscribe((messages) => {
          this.getCommentsAndSetLayout(messages);
        });
    } else {
      this.messagesSubscription = this.timeLineService
        .getTimelineMessages()
        .subscribe({
          next: (messages) => {
            this.getMessagesAndSetLayout(messages);
          },
        });
    }
  }

  sair() {
    this.auth.signOut();
  }
  ngOnInit(): void {
   this.checkRoute();
   }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.messagesSubscription?.unsubscribe();
  }
}
