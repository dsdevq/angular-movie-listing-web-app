import { EMoviesActions, IMovie } from 'src/app/shared/interface';
import { createAction, props } from '@ngrx/store';

export const loadMovies = createAction(EMoviesActions.LOAD);
export const loadMoviesSucc = createAction(
  EMoviesActions.SUCC,
  props<{ movies: IMovie[] }>()
);
export const loadMoviesFail = createAction(
  EMoviesActions.FAIL,
  props<{ error: string }>()
);
export const suggestMovie = createAction(
  EMoviesActions.SUGGEST,
  props<{ id: number }>()
);
