import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './core/store/auth/auth.reducer';
import { postReducer, PostsState } from './core/store/post/post.reducer';
import { userReducer, UserState } from './core/store/user/user.reducer';

export interface AppState {
  auth: AuthState;
  posts: PostsState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  posts: postReducer,
  user: userReducer,
};
