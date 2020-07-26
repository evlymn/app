import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBottomSheetComponent } from './footer-bottom-sheet.component';

describe('FooterBottomSheetComponent', () => {
  let component: FooterBottomSheetComponent;
  let fixture: ComponentFixture<FooterBottomSheetComponent>;

  beforeEach(async(() => {
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
