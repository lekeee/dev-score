import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const userFeature = createFeatureSelector<UserState>('user');

export const selectAuthenticated = createSelector(
  userFeature,
  (state) => state.authenticated
);

export const selectAuthImage = createSelector(
  selectAuthenticated,
  (authenticated) => authenticated?.image
);

export const selectResponseMessage = createSelector(
  userFeature,
  (state) => state.message
);
