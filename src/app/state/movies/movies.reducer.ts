import { loadMovies, loadMoviesSucc, loadMoviesFail } from './movies.actions';
import { EStatuses, IMoviesState } from './../../shared/interface';
import { createReducer, on } from '@ngrx/store';

export const initialState: IMoviesState = {
  movies: [],
  error: null,
  status: EStatuses.PEND,
};

export const moviesReducer = createReducer(
  // Supply the initial state
  initialState,
  // Trigger loading the movies
  on(loadMovies, (state) => ({ ...state, status: EStatuses.LOAD })),
  // Handle successfully loaded movies
  on(loadMoviesSucc, (state, { movies }) => ({
    ...state,
    movies,
    error: null,
    status: EStatuses.SUCC,
  })),
  // Handle movies load failure
  on(loadMoviesFail, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  }))
);
