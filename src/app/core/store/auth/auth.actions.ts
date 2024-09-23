import { createAction, props } from '@ngrx/store';
import { AuthLogin } from '../../dtos/auth-login';

export const login = createAction(
  '[Auth] Login',
  props<{ authLogin: AuthLogin }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
