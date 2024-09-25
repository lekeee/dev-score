import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { selectToken } from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectToken).pipe(
    take(1),
    map((token) => {
      if (token && auth.isTokenValid(token)) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    })
  );
};
