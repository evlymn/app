import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelineFooterComponent } from './timeline-footer.component';

describe('TimelineFooterComponent', () => {
  let component: TimelineFooterComponent;
  let fixture: ComponentFixture<TimelineFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
