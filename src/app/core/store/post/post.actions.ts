import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';
import { Filters } from '../../types/filters';

export const loadPosts = createAction('[Post] Load Posts');

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[] }>()
);

export const setFilters = createAction(
  '[Post] Set Filters',
  props<{ filters: Filters }>()
);

export const likePost = createAction(
  '[Post] Like Post',
  props<{ id: number }>()
);

export const likePostSuccess = createAction(
  '[Post] Like Post Success',
  props<{ id: number }>()
);

export const unlikePost = createAction(
  '[Post] Unlike Post',
  props<{ id: number }>()
);

export const unlikePostSuccess = createAction(
  '[Post] Unlike Post Success',
  props<{ id: number }>()
);

export const loadTrendingPosts = createAction('[Post] Load Trending Posts');

export const loadTrendingPostsSuccess = createAction(
  '[Post] Load Trending Posts Success',
  props<{ posts: Post[] }>()
);

export const loadMyPosts = createAction('[Post] Load My Posts');

export const loadMyPostsSuccess = createAction(
  '[Post] Load My Posts Success',
  props<{ posts: Post[] }>()
);

export const findMyPost = createAction(
  '[Post] Find My Post',
  props<{ id: number }>()
);

export const resetMyPostsState = createAction('[Post] Reset My Posts');

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Post }>()
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: Post }>()
);

export const updatePost = createAction(
  '[Post] Update Post',
  props<{ post: Partial<Post> }>()
);

export const updatePostSuccess = createAction(
  '[Post] Update Post Success',
  props<{ post: Update<Post> }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete Post Success',
  props<{ id: number }>()
);
