import { TestBed } from '@angular/core/testing';

import { TamponService } from './tampon.service';

describe('TamponService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TamponService = TestBed.get(TamponService);
    expect(service).toBeTruthy();
  });
});
