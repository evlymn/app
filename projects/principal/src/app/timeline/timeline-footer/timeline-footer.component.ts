import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FooterBottomSheetComponent } from './footer-bottom-sheet/footer-bottom-sheet.component';
import { TimelineService } from '../timeline.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { AnalyticsService } from '../../shared/services/firebase/analytics/analytics.service';

@Component({
  selector: 'app-timeline-footer',
  templateUrl: './timeline-footer.component.html',
  styleUrls: ['./timeline-footer.component.scss'],
})
export class TimelineFooterComponent implements OnInit {
  percentage = null;
  constructor(
    private bottomSheet: MatBottomSheet,
    public timeLineService: TimelineService,
    private analyticsService: AnalyticsService
  ) {}

  openBottomSheet(): void {
    this.bottomSheet
      .open(FooterBottomSheetComponent, {
        data: { image: this.timeLineService.admin.enableImageSend },
      })
      .afterDismissed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.addImage(data);
          }
        },
      });
  }

  async addImage(data: any) {
    const pushId = this.timeLineService.createPushId();
    let returnImage: {
      pushId: string;
      uploadTask: AngularFireUploadTask;
    } = null;

    if (data.image) {
      returnImage = await this.timeLineService.addImage(
        pushId,
        data.image,
        data.name
      );
      returnImage.uploadTask.percentageChanges().subscribe({
        next: (percent) => {
          this.percentage = percent.toFixed(0);
        },
        complete: () => {
          this.percentage = null;
        },
      });
      returnImage.uploadTask.then(async (taskSnapshot) => {
        const url = await taskSnapshot.ref.getDownloadURL();
        this.timeLineService
          .createMessage(pushId, data.text, url)
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.analyticsService.eventLog('enviou_mensagem', {
              image: true,
            });
          })
          .catch((err) => console.log(err));
      });
    } else {
      this.timeLineService
        .createMessage(pushId, data.text)
        .then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.analyticsService.eventLog('enviou_mensagem', {
            image: false,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  ngOnInit(): void {}
}
