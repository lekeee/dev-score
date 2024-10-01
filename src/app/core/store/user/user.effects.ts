import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, merge, mergeMap, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import * as actions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  loadUser = createEffect(() =>
    this.action$.pipe(
      ofType(actions.loadUser),
      switchMap((action) =>
        this.userService
          .getUser(action.id)
          .pipe(map((user) => actions.loadUserSuccess({ user })))
      )
    )
  );

  updateUser = createEffect(() =>
    this.action$.pipe(
      ofType(actions.updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.updatePayload).pipe(
          mergeMap((res) => {
            const keys = Object.keys(action.updatePayload);
            if (keys.length === 1 && keys[0] === 'id')
              return of(
                actions.updateUserFailed({
                  message: {
                    text: 'Passwords do not match',
                    type: 'error',
                  },
                })
              );
            return merge(
              of(actions.loadUser({ id: action.updatePayload.id! })),
              of(
                actions.updateUserSuccess({
                  message: {
                    text: 'Your data has been successfully updated.',
                    type: 'success',
                  },
                })
              )
            );
          }),
          catchError((err) =>
            of(
              actions.updateUserFailed({
                message: {
                  text: err.error.message,
                  type: 'error',
                },
              })
            )
          )
        )
      )
    )
  );

  updateImage = createEffect(() =>
    this.action$.pipe(
      ofType(actions.updateImage),
      switchMap((action) => {
        const formData = new FormData();
        formData.append('image', action.image);
        return this.userService
          .uploadImage(formData)
          .pipe(map((res) => actions.updateImageSuccess({ image: res.image })));
      })
    )
  );
}
