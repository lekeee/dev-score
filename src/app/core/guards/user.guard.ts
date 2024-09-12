import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const authenticated = auth.isAuth();

  if (authenticated) {
    router.navigate(['']);
    return false;
  }

  return true;
};
