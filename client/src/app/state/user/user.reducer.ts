import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
} from './user.actions';
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
  })),
  on(addItem, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  on(addItemSuccess, (state, { item }) => ({
    ...state,
    user: {
      ...state.user,
      movies: [...state.user.movies, item],
    },
    status: EStatuses.SUCC,
  })),
  on(addItemFailure, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  }))
);
