import { TestBed, inject } from '@angular/core/testing';

import { CommentaireService } from './commentaire.service';

describe('CommentaireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentaireService]
    });
  });

  it('should be created', inject([CommentaireService], (service: CommentaireService) => {
    expect(service).toBeTruthy();
  }));
});
