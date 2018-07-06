import { TestBed, inject } from '@angular/core/testing';

import { LoanServiceService } from './loan-service.service';

describe('LoanServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanServiceService]
    });
  });

  it('should be created', inject([LoanServiceService], (service: LoanServiceService) => {
    expect(service).toBeTruthy();
  }));
});
