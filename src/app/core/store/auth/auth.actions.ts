import { createAction, props } from '@ngrx/store';
import { AuthLogin } from '../../dtos/auth-login';
import { ResponseMessage } from '../../types/response-message';

export const login = createAction(
  '[Auth] Login',
  props<{ authLogin: AuthLogin }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: ResponseMessage }>()
);

export const logout = createAction('[Auth] Logout');
