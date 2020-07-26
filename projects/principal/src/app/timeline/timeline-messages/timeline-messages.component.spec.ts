import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMessagesComponent } from './timeline-messages.component';

describe('TimelineMessageComponent', () => {
  let component: TimelineMessagesComponent;
  let fixture: ComponentFixture<TimelineMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
