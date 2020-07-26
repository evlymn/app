import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { TimelineService } from '../../timeline.service';

@Component({
  selector: 'app-footer-bottom-sheet',
  templateUrl: './footer-bottom-sheet.component.html',
  styleUrls: ['./footer-bottom-sheet.component.scss']
})
export class FooterBottomSheetComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  text = '';
  name = '';
  showImage = true;
  position = 4;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<FooterBottomSheetComponent>,
    public timelineService: TimelineService
  ) {
    this.showImage = data.image;
  }

  turn() {
    this.position = this.position - 1;
    this.position = this.position < 0 ? 3 : this.position;
  }

  fileChangeEvent(event: any): void {
    this.name = event.target.files[0].name;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    console.log('image loaded');
  }
  cropperReady() {
    console.log('cropper ready');
  }
  loadImageFailed() {
    console.log('image load failed');
  }

  cutOut() {
    this.bottomSheetRef.dismiss({
      image: this.croppedImage,
      text: this.text,
      name: this.name
    });
  }

  textKeyUp(textAreaEvent: any) {
    this.text = textAreaEvent.target.value;
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void { }
}
