import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import { ResponseMessage } from '../../types/response-message';
import * as actions from './user.actions';

export interface UserState {
  authenticated: User | null;
  message: ResponseMessage;
}

const initialState: UserState = {
  authenticated: null,
  message: {
    text: '',
    type: '',
  },
};

export const userReducer = createReducer(
  initialState,
  on(actions.loadUserSuccess, (state, { user }) => {
    return {
      ...state,
      authenticated: user,
    };
  }),
  on(actions.updateImageSuccess, (state, { image }) => {
    if (!state.authenticated) throw new Error('User not found in store');
    return {
      ...state,
      authenticated: {
        ...state.authenticated,
        image,
      },
    };
  }),
  on(actions.removeAuthenticated, (state) => {
    return {
      ...state,
      authenticated: null,
    };
  }),
  on(actions.updateUserSuccess, (state, { message }) => {
    return {
      ...state,
      message,
    };
  }),
  on(actions.updateUserFailed, (state, { message }) => {
    return {
      ...state,
      message,
    };
  })
);
