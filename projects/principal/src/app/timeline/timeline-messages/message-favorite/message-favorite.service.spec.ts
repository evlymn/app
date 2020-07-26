import { TestBed } from '@angular/core/testing';

import { MessageFavoriteService } from './message-favorite.service';

describe('MensagemFavoritoService', () => {
  let service: MessageFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
