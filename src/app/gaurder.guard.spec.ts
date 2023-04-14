import { TestBed } from '@angular/core/testing';

import { GaurderGuard } from './gaurder.guard';

describe('GaurderGuard', () => {
  let guard: GaurderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GaurderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
