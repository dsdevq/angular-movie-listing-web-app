import {
  EMoviesTvShowsActions,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const loadMoviesAndTvShows = createAction(
  EMoviesTvShowsActions.MOVIE_AND_TV_LOAD,
  props<{ moviePage: number; tvShowPage: number }>()
);

export const loadMoviesTvShows = createAction(
  EMoviesTvShowsActions.MOVIE_TV_LOAD,
  props<{ itemType: string; page: number }>()
);

export const loadMoviesTvSucc = createAction(
  EMoviesTvShowsActions.MOVIE_TV_SUCC,
  props<{ movies: IMovie[] }>()
);

export const loadMoviesTvFail = createAction(
  EMoviesTvShowsActions.MOVIE_TV_FAIL,
  props<{ error: string }>()
);

export const suggestMovieTvShow = createAction(
  EMoviesTvShowsActions.SUGGEST,
  props<{ id: number }>()
);

export const addMovieTvShow = createAction(
  EMoviesTvShowsActions.ADD,
  props<{ id: number }>()
);
