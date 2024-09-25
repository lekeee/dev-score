import { createReducer, on } from '@ngrx/store';
import { ResponseMessage } from '../../types/response-message';
import * as actions from './auth.actions';

export interface AuthState {
  token: string;
  message: ResponseMessage;
}

export const initialState: AuthState = {
  token: '',
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
    };
  }),
  on(actions.loginFailure, (state, { error }) => {
    return {
      ...state,
      token: '',
      message: error,
    };
  }),
  on(actions.logout, (state) => {
    return {
      ...state,
      token: '',
    };
  }),
  on(actions.restoreStatusSuccess, (state, { token }) => {
    return {
      ...state,
      token,
    };
  }),
  on(actions.restoreStatusFailed, (state) => {
    return {
      ...state,
      token: '',
    };
  })
);
