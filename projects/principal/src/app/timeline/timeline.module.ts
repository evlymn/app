import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineMessagesComponent } from './timeline-messages/timeline-messages.component';
import { MessageFavoriteComponent } from './timeline-messages/message-favorite/message-favorite.component';
import { TimelineFooterComponent } from './timeline-footer/timeline-footer.component';
import { FooterBottomSheetComponent } from './timeline-footer/footer-bottom-sheet/footer-bottom-sheet.component';
import { MaterialModule } from '../material-module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MomentModule } from 'ngx-moment';
import { RouterModule } from '@angular/router';
import { TimelineProfileComponent } from './timeline-profile/timeline-profile.component';
import { FormsModule } from '@angular/forms';
import { TimelineCommentsComponent } from './timeline-comments/timeline-comments.component';
import { MessageSnackbarDeleteComponent } from './timeline-messages/message-snackbar-delete/message-snackbar-delete.component';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineMessagesComponent,
    MessageFavoriteComponent,
    TimelineFooterComponent,
    FooterBottomSheetComponent,
    TimelineProfileComponent,
    TimelineCommentsComponent,
    MessageSnackbarDeleteComponent
  ],
  imports: [CommonModule, MaterialModule, ImageCropperModule, MomentModule, RouterModule, FormsModule],
  exports: [TimelineComponent, TimelineFooterComponent, FooterBottomSheetComponent],
  providers: []
})
export class TimelineModule { }
