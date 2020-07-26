import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineProfileComponent } from './timeline-profile.component';

describe('TimelineProfileComponent', () => {
  let component: TimelineProfileComponent;
  let fixture: ComponentFixture<TimelineProfileComponent>;

  beforeEach(async(() => {
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
