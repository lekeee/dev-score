import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth/auth.service';
import { selectToken } from '../store/auth/auth.selectors';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  store.select(selectToken).subscribe((token) => {
    if (token && auth.isTokenValid(token)) {
      router.navigate(['']);
      return false;
    } else {
      return true;
    }
  });

  return true;
};
