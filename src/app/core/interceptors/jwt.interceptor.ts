import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs';
import { selectToken } from '../store/auth/auth.selectors';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(selectToken).pipe(
    take(1),
    switchMap((token) => {
      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
        return next(clonedRequest);
      }
      return next(req);
    })
  );
};
