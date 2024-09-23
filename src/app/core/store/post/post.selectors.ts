import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './post.reducer';

export const postsFeature = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(postsFeature, (posts) =>
  posts.ids.map((id) => posts.entities[id]!)
);

export const selectFilters = createSelector(
  postsFeature,
  (state) => state.filters
);

export const selectFilteredPosts = createSelector(
  selectAllPosts,
  selectFilters,
  (posts, filters) => {
    if (filters.language === '' && filters.title === '') return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (post.language === filters.language || filters.language == '')
    );
  }
);
