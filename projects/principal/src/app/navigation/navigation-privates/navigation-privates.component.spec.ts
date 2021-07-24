import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigationPrivatesComponent } from './navigation-privates.component';

describe('NavigationPrivatesComponentComponent', () => {
  let component: NavigationPrivatesComponent;
  let fixture: ComponentFixture<NavigationPrivatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationPrivatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPrivatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
