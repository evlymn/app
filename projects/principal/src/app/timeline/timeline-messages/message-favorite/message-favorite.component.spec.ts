import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFavoriteComponent } from './message-favorite.component';

describe('MensagemFavoritoComponent', () => {
  let component: MessageFavoriteComponent;
  let fixture: ComponentFixture<MessageFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
