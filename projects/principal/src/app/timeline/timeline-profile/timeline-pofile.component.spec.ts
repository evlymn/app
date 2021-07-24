import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelineProfileComponent } from './timeline-profile.component';

describe('TimelineProfileComponent', () => {
  let component: TimelineProfileComponent;
  let fixture: ComponentFixture<TimelineProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
