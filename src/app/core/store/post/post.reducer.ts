import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/post';
import { createReducer, on } from '@ngrx/store';
import * as actions from './post.actions';

export interface PostsState extends EntityState<Post> {}

export const adapter = createEntityAdapter<Post>();

export const initialState: PostsState = adapter.getInitialState();

export const postReducer = createReducer(
  initialState,
  on(actions.loadPostsSuccess, (state, action) => {
    return adapter.addMany(action.posts, state);
  })
);
