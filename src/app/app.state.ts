import { ActionReducerMap } from '@ngrx/store';
import { postReducer, PostsState } from './core/store/post/post.reducer';
import { authReducer, AuthState } from './core/store/auth/auth.reducer';

export interface AppState {
  auth: AuthState;
  posts: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  posts: postReducer,
};
