import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSnackbarDeleteComponent } from './message-snackbar-delete.component';

describe('MessageSnackbarDeleteComponent', () => {
  let component: MessageSnackbarDeleteComponent;
  let fixture: ComponentFixture<MessageSnackbarDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSnackbarDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSnackbarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
