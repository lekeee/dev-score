import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';
import { Filters } from '../../types/filters';

export const loadPosts = createAction('[Post] Load posts');

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
