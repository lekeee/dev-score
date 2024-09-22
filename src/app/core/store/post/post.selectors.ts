import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.reducer';
import { Filters } from '../../types/filters';
import { Post } from '../../models/post';

export const postsFeature = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(postsFeature, (posts) => {
  return posts.ids.map((id) => posts.entities[id]!);
});
