import { loginUser, loginUserSuccess, loginUserFailure } from './user.actions';
import {
  EStatuses,
  IUser,
  IUserState,
} from '../../shared/interfaces/interface';
import { createReducer, on } from '@ngrx/store';

export const userFeatureKey = 'user';

export interface State {}

export const initialState: IUserState = {
  user: {} as IUser,
  error: null,
  status: EStatuses.PEND,
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  on(loginUserSuccess, (state, { data }) => ({
    ...state,
    user: data,
    status: EStatuses.SUCC,
  })),
  on(loginUserFailure, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  }))
);
