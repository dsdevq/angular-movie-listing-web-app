import {
  loadMovies,
  loadMoviesSucc,
  loadMoviesFail,
  suggestMovie,
} from './movies.actions';
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
    movies: [...state.movies, ...movies],
    error: null,
    status: EStatuses.SUCC,
  })),
  // Handle movies load failure
  on(loadMoviesFail, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  })),
  on(suggestMovie, (state, { id }) => {
    return {
      ...state,
      movies: state.movies.map((el) =>
        el.id === id ? { ...el, suggested: !el.suggested } : el
      ),
    };
  })
);
