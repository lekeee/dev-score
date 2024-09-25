import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
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

  updateImage = createEffect(() =>
    this.action$.pipe(
      ofType(actions.updateImage),
      switchMap((action) => {
        const formData = new FormData();
        formData.append('image', action.image);
        return this.userService
          .uploadImage(formData)
          .pipe(
            map(() => actions.updateImageSuccess({ image: action.image.name }))
          );
      })
    )
  );
}
