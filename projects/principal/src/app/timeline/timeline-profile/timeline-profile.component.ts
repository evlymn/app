import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication/authentication.service';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline-profile',
  templateUrl: './timeline-profile.component.html',
  styleUrls: ['./timeline-profile.component.scss'],
})
export class TimelineProfileComponent implements OnInit {
  @Input() private: boolean;
  photoURL = null;
  displayName = null;
  email = null;
  id = null;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    public timelineService: TimelineService
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.timelineService.getUserInfo(this.id).then(user => {
        this.photoURL = user.photoURL;
        this.displayName = user.displayName;
        this.email = user.email;
      });

    }
  }
}
