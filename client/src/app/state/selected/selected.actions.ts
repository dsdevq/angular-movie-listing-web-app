import {
  ESelectActions,
  IMovieDetails,
} from '../../shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const loadSelect = createAction(
  ESelectActions.LOAD,
  props<{ url: string; itemType: string }>()
);
export const loadSelectSucc = createAction(
  ESelectActions.SUCC,
  props<{ selected: IMovieDetails }>()
);
export const loadSelectFail = createAction(
  ESelectActions.FAIL,
  props<{ error: string }>()
);
