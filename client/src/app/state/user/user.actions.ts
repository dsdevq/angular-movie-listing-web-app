import { IMovie } from 'src/app/shared/interfaces/interface';
import { EUserActions, IUser } from '../../shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const authUser = createAction(EUserActions.AUTH);

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

export const addItem = createAction(
  EUserActions.ADD,
  props<{ item: IMovie }>()
);
export const addItemSuccess = createAction(
  EUserActions.ADD_SUCC,
  props<{ item: IMovie }>()
);
export const addItemFailure = createAction(
  EUserActions.ADD_FAIL,
  props<{ error: string }>()
);
