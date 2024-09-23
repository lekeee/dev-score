import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../../models/post';
import { createReducer, on } from '@ngrx/store';
import * as actions from './post.actions';
import { Filters } from '../../types/filters';

export interface PostsState extends EntityState<Post> {
  filters: Filters;
}

export const adapter = createEntityAdapter<Post>();

export const initialState: PostsState = adapter.getInitialState({
  filters: {
    title: '',
    language: '',
  },
});

export const postReducer = createReducer(
  initialState,
  on(actions.loadPostsSuccess, (state, { posts }) => {
    return adapter.addMany(posts, state);
  }),
  on(actions.setFilters, (state, { filters }) => {
    return {
      ...state,
      filters,
    };
  })
);
