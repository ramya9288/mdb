import { TestBed, async, inject } from '@angular/core/testing';

import { SpvGuard } from './spv.guard';

describe('SpvGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpvGuard]
    });
  });

  it('should ...', inject([SpvGuard], (guard: SpvGuard) => {
    expect(guard).toBeTruthy();
  }));
});
