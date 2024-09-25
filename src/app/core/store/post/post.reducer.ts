import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Post } from '../../models/post';
import { Filters } from '../../types/filters';
import * as actions from './post.actions';

export interface PostsState extends EntityState<Post> {
  filters: Filters;
  trendingPosts: EntityState<Post>;
  myPosts: MyPostsState;
}

export interface MyPostsState extends EntityState<Post> {
  selectedPostId: number;
}

export const adapter = createEntityAdapter<Post>();

export const initialState: PostsState = adapter.getInitialState({
  filters: {
    title: '',
    language: '',
  },
  trendingPosts: adapter.getInitialState(),
  myPosts: adapter.getInitialState({
    selectedPostId: -1,
  }),
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
  }),
  on(actions.loadTrendingPostsSuccess, (state, { posts }) => {
    return {
      ...state,
      trendingPosts: adapter.addMany(posts, state.trendingPosts),
    };
  }),
  on(actions.loadMyPostsSuccess, (state, { posts }) => {
    return {
      ...state,
      myPosts: adapter.addMany(posts, state.myPosts),
    };
  }),
  on(actions.findMyPost, (state, { id }) => {
    return {
      ...state,
      myPosts: {
        ...state.myPosts,
        selectedPostId: id,
      },
    };
  })
);
