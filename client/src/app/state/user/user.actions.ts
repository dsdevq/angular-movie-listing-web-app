import { EUserActions, IUser } from '../../shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  EUserActions.LOAD,
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  EUserActions.SUCC,
  props<{ data: IUser }>()
);

export const loginUserFailure = createAction(
  EUserActions.FAIL,
  props<{ error: string }>()
);
