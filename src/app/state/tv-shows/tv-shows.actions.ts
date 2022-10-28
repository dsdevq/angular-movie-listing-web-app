import { ETvShowsActions, IMovie } from 'src/app/shared/interface';
import { createAction, props } from '@ngrx/store';

export const loadTvShows = createAction(ETvShowsActions.LOAD);
export const loadTvShowsSucc = createAction(
  ETvShowsActions.SUCC,
  props<{ tvShows: IMovie[] }>()
);
export const loadTvShowsFail = createAction(
  ETvShowsActions.FAIL,
  props<{ error: string }>()
);
