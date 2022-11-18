import {
  suggestMovieTvShow,
  addMovieTvShow,
  loadMoviesTvShows,
  loadMoviesTvSucc,
  loadMoviesTvFail,
} from './movies.actions';
import { EStatuses, IMoviesState } from '../../shared/interfaces/interface';
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
  on(loadMoviesTvShows, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  // Handle successfully loaded movies
  on(loadMoviesTvSucc, (state, { movies }) => ({
    ...state,
    movies: [...state.movies, ...movies],
    status: EStatuses.SUCC,
  })),
  // Handle movies load failure
  on(loadMoviesTvFail, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  })),

  on(addMovieTvShow, (state, { id }) => ({
    ...state,
    movies: state.movies.map((el) =>
      el.id === id ? { ...el, isAdded: true } : el
    ),
  })),

  on(suggestMovieTvShow, (state, { id }) => ({
    ...state,
    movies: state.movies.map((el) =>
      el.id === id ? { ...el, isManualSuggestion: true } : el
    ),
  }))
);
