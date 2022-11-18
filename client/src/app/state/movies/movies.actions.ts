import {
  EMoviesTvShowsActions,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction(EMoviesTvShowsActions.MOVIE_LOAD);
export const loadTvShows = createAction(EMoviesTvShowsActions.TV_LOAD);

export const loadMoviesSucc = createAction(
  EMoviesTvShowsActions.MOVIE_SUCC,
  props<{ movies: IMovie[] }>()
);

export const loadMoviesFail = createAction(
  EMoviesTvShowsActions.MOVIE_FAIL,
  props<{ error: string }>()
);

export const suggestMovieTvShow = createAction(
  EMoviesTvShowsActions.SUGGEST,
  props<{ id: number }>()
);
