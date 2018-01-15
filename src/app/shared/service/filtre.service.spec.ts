import { TestBed, inject } from '@angular/core/testing';

import { FiltreService } from './filtre.service';

describe('FiltreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltreService]
    });
  });

  it('should be created', inject([FiltreService], (service: FiltreService) => {
    expect(service).toBeTruthy();
  }));
});
