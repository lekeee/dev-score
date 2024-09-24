import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
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
            this.router.navigate(['']);
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

  logout = createEffect(
    () =>
      this.action$.pipe(
        ofType(actions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    { dispatch: false }
  );
}
