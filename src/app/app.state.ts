import { ActionReducerMap } from '@ngrx/store';
import { postReducer, PostsState } from './core/store/post/post.reducer';

export interface AppState {
  posts: PostsState;
}

export const reducers: ActionReducerMap<AppState> = {
  posts: postReducer,
};
