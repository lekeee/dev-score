import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { loadUser, removeAuthenticated } from '../user/user.actions';
import * as actions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,

    private router: Router
  ) {}

  login = createEffect(() =>
    this.action$.pipe(
      ofType(actions.login),
      switchMap((action) =>
        this.authService.login(action.authLogin).pipe(
          map((res) => {
            return actions.loginSuccess({ token: res.access_token });
          }),
          catchError((err) =>
            of(
              actions.loginFailure({
                error: { text: err.message, type: 'error' },
              })
            )
          )
        )
      )
    )
  );

  loginSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(actions.loginSuccess),
      switchMap((action) => {
        const id = this.authService.getIdFromToken(action.token);
        this.router.navigate(['']);
        return of(loadUser({ id }));
      })
    )
  );

  logout = createEffect(() =>
    this.action$.pipe(
      ofType(actions.logout),
      switchMap(() => {
        this.authService.logout();
        return of(removeAuthenticated());
      })
    )
  );

  restore = createEffect(() =>
    this.action$.pipe(
      ofType(actions.restoreStatus),
      switchMap(() => {
        if (!this.authService.isAuth()) {
          return of(actions.restoreStatusFailed());
        }
        const token = this.authService.getAuthToken();
        return of(actions.loginSuccess({ token: token! }));
      })
    )
  );
}
