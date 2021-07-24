import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterBottomSheetComponent } from './footer-bottom-sheet.component';

describe('FooterBottomSheetComponent', () => {
  let component: FooterBottomSheetComponent;
  let fixture: ComponentFixture<FooterBottomSheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
