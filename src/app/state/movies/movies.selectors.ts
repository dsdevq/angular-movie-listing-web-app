import { IAppState, IMoviesState } from './../../shared/interface';
import { createSelector } from '@ngrx/store';

export const selectMovies = (state: IAppState) => state.moviesState;
export const selectMoviesAndTvShows = createSelector(
  selectMovies,
  (state: IMoviesState) => state.movies
);
export const selectAllMovies = createSelector(
  selectMovies,
  (state: IMoviesState) => state.movies.filter((e) => e.type === 'movie')
);
export const selectAllTvShows = createSelector(
  selectMovies,
  (state: IMoviesState) => state.movies.filter((e) => e.type === 'tv')
);
