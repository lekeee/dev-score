import { createReducer, on } from '@ngrx/store';
import { ResponseMessage } from '../../types/response-message';
import * as actions from './auth.actions';

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  message: ResponseMessage;
}

export const initialState: AuthState = {
  token: '',
  isLoggedIn: false,
  message: {
    text: '',
    type: '',
  },
};

export const authReducer = createReducer(
  initialState,
  on(actions.loginSuccess, (state, { token }) => {
    return {
      ...state,
      token,
      isLoggedIn: true,
    };
  }),
  on(actions.loginFailure, (state, { error }) => {
    return {
      ...state,
      token: '',
      isLoggedIn: false,
      message: error,
    };
  }),
  on(actions.logout, (state) => {
    return {
      ...state,
      token: '',
      isLoggedIn: false,
    };
  }),
  on(actions.restoreStatusSuccess, (state, { token }) => {
    return {
      ...state,
      token,
      isLoggedIn: true,
    };
  }),
  on(actions.restoreStatusFailed, (state) => {
    return {
      ...state,
      token: '',
      isLoggedIn: false,
    };
  })
);
