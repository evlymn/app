import { Component, OnInit, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { TimelineService } from '../../timeline.service';

@Component({
  selector: 'app-message-snackbar-delete',
  templateUrl: './message-snackbar-delete.component.html',
  styleUrls: ['./message-snackbar-delete.component.scss'],
})
export class MessageSnackbarDeleteComponent implements OnInit {
  id = null;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackRef: MatSnackBarRef<MessageSnackbarDeleteComponent>,
    private timelineService: TimelineService
  ) {
    this.id = data;
  }

  delete() {
    this.timelineService.deleteMessage(this.id).then(() => {
      this.snackRef.dismiss();
    });
  }

  cancel() {
    this.snackRef.dismiss();
  }
  ngOnInit(): void { }
}
