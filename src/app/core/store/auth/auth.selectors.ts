import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authFeature = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(authFeature, (state) => state.token);

export const selectResponseMessage = createSelector(
  authFeature,
  (state) => state.message
);
