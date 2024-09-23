import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';
import { Filters } from '../../types/filters';

export const loadPosts = createAction('[Post] Load posts');

export const loadPostsSuccess = createAction(
  '[Post] Load posts success',
  props<{ posts: Post[] }>()
);

export const setFilters = createAction(
  '[Post] Set filters',
  props<{ filters: Filters }>()
);
