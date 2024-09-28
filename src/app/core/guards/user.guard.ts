import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['']);
        return false;
      } else return true;
    })
  );
};
