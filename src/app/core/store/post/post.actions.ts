import { createAction, props } from '@ngrx/store';
import { Post } from '../../models/post';

export const loadPosts = createAction('[Post] Load posts');
export const loadPostsSuccess = createAction(
  '[Post] Load posts success',
  props<{ posts: Post[] }>()
);
