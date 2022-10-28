import { IAppState, IMoviesState } from './../../shared/interface';
import { createSelector } from '@ngrx/store';

export const selectMovies = (state: IAppState) => state.moviesState;
export const selectAllMovies = createSelector(
  selectMovies,
  (state: IMoviesState) => state.movies
);
