import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postOwnerGuard } from './post-owner.guard';

describe('postOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
