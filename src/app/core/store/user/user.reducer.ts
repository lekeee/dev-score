import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as actions from './user.actions';

export interface UserState {
  authenticated: User | null;
}

const initialState: UserState = {
  authenticated: null,
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
  })
);
