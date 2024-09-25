import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
import { ResponseMessage } from '../../types/response-message';

export const loadUser = createAction(
  '[User] Load Authenticated',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[User] Load Authenticated Success',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User] Update User Success',
  props<{ message: ResponseMessage }>()
);

export const updateUserSuccess = createAction(
  '[User] Update user',
  props<{ updatePayload: Partial<User> }>()
);

export const updateImage = createAction(
  '[User] Update Authenticated Image',
  props<{ image: File }>()
);

export const updateImageSuccess = createAction(
  '[User] Update Authenticated Image Success',
  props<{ image: string }>()
);

export const removeAuthenticated = createAction('[User] Remove Authenticated');
