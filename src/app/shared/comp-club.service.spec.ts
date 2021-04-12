import { TestBed } from '@angular/core/testing';

import { CompClubService } from './comp-club.service';

describe('CompClubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompClubService = TestBed.get(CompClubService);
    expect(service).toBeTruthy();
  });
});
