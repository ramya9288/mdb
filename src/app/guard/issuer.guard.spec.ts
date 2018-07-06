import { TestBed, async, inject } from '@angular/core/testing';

import { IssuerGuard } from './issuer.guard';

describe('IssuerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuerGuard]
    });
  });

  it('should ...', inject([IssuerGuard], (guard: IssuerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
