import { IMovie } from 'src/app/shared/interfaces/interface';
import { EUserActions, IUser } from '../../shared/interfaces/interface';
import { createAction, props } from '@ngrx/store';

export const authUser = createAction(EUserActions.AUTH);

export const userRegister = createAction(
  EUserActions.SIGN_UP,
  props<{ username: string; email: string; password: string }>()
);

export const userRegisterSuccess = createAction(
  EUserActions.SIGN_UP_SUCC,
  props<{ message: string }>()
);

export const userRegisterFailure = createAction(
  EUserActions.SIGN_UP_FAIL,
  props<{ message: string }>()
);

export const loginUser = createAction(
  EUserActions.LOAD,
  props<{ email: string; password: string }>()
);
export const logoutUser = createAction(EUserActions.LOGOUT);

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

export const suggestItem = createAction(
  EUserActions.SUGG,
  props<{ item: IMovie }>()
);

export const suggestItemSuccess = createAction(
  EUserActions.SUGG_SUCC,
  props<{ item: IMovie }>()
);
export const suggestItemSuccessNotLogged = createAction(
  EUserActions.SUGG_SUCC_NOT_LOGGED,
  props<{ item: IMovie }>()
);

export const suggestItemFailure = createAction(
  EUserActions.SUGG_FAIL,
  props<{ error: string }>()
);
