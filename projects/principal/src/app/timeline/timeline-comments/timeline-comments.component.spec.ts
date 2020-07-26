import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCommentsComponent } from './timeline-comments.component';

describe('TimelineCommentComponent', () => {
  let component: TimelineCommentsComponent;
  let fixture: ComponentFixture<TimelineCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
