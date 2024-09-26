import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, merge, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { resetMyPostsState } from '../post/post.actions';
import { loadUser, resetUserState } from '../user/user.actions';
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
      tap(() => {
        this.router.navigate(['']);
      }),
      switchMap((action) => {
        const id = this.authService.getIdFromToken(action.token);
        return of(loadUser({ id }));
      })
    )
  );

  logout = createEffect(() =>
    this.action$.pipe(
      ofType(actions.logout),
      tap(() => {
        this.router.navigate(['']);
      }),
      switchMap(() => {
        this.authService.logout();
        return merge(of(resetUserState()), of(resetMyPostsState()));
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
        return of(actions.restoreStatusSuccess({ token: token! }));
      })
    )
  );

  restoreSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(actions.restoreStatusSuccess),
      switchMap((action) => {
        const id = this.authService.getIdFromToken(action.token);
        return of(loadUser({ id }));
      })
    )
  );
}
