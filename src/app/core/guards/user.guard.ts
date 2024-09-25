import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { selectToken } from '../store/auth/auth.selectors';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const store = inject(Store);

  return store.select(selectToken).pipe(
    take(1),
    map((token) => {
      if (token && auth.isTokenValid(token)) {
        return false;
      } else {
        return true;
      }
    })
  );
};
