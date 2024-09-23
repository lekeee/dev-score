import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';

export interface AuthState {
  token: string;
}

export const initialState: AuthState = {
  token: '',
};

export const authReducer = createReducer(
  initialState,
  on(actions.loginSuccess, (state, { token }) => {
    return {
      token,
    };
  })
);
