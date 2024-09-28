import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';

export const userGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const store = inject(Store);

  return store.select(selectIsLoggedIn).pipe(
    take(1),
    map((isLoggedIn) => {
      return isLoggedIn ? false : true;
    })
  );
};
