import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  auth.loggedIn$.subscribe((isLogged) => {
    if (isLogged) {
      router.navigate(['']);
      return false;
    } else return true;
  });

  return true;
};
