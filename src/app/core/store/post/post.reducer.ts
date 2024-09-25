import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Post } from '../../models/post';
import { Filters } from '../../types/filters';
import * as actions from './post.actions';

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
  }),
  on(actions.likePostSuccess, (state, { id }) => {
    const post = state.entities[id];

    if (post) {
      const updatedPost = { ...post, likesNumber: (post.likesNumber || 0) + 1 };

      return adapter.updateOne({ id, changes: updatedPost }, state);
    }
    return state;
  }),
  on(actions.unlikePostSuccess, (state, { id }) => {
    const post = state.entities[id];
    if (post) {
      const updatedPost = { ...post, likesNumber: (post.likesNumber || 0) - 1 };
      return adapter.updateOne({ id, changes: updatedPost }, state);
    }
    return state;
  })
);
