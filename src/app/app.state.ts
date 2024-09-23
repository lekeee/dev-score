import { ActionReducerMap } from '@ngrx/store';
import { postReducer, PostsState } from './core/store/post/post.reducer';
import { authReducer } from './core/store/auth/auth.reducer';

export interface AppState {
  posts: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: postReducer,
};
