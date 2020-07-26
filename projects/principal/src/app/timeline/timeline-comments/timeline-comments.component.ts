import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-comments',
  templateUrl: './timeline-comments.component.html',
  styleUrls: ['./timeline-comments.component.scss']
})
export class TimelineCommentsComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}
