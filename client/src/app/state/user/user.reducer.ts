import { EMovieTypes, IMovie } from './../../shared/interfaces/interface';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  suggestItem,
  suggestItemSuccess,
  suggestItemFailure,
  logoutUser,
  userRegister,
  userRegisterSuccess,
  userRegisterFailure,
} from './user.actions';
import {
  EStatuses,
  IUser,
  IUserState,
} from '../../shared/interfaces/interface';
import { createReducer, on } from '@ngrx/store';

export const initialState: IUserState = {
  user: {
    email: '',
    expiresIn: '',
    idToken: '',
    manual_suggestions: [] as IMovie[],
    tvShows: [] as IMovie[],
    suggestions: [] as IMovie[],
    username: '',
    roles: [],
    movies: [] as IMovie[],
  } as IUser,
  error: null,
  status: EStatuses.PEND,
};

export const userReducer = createReducer(
  initialState,

  // $ LOGIN
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

  // $ Register
  on(userRegister, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  on(userRegisterSuccess, (state, { message }) => ({
    ...state,
    register: {
      message,
    },
    error: null,
    status: EStatuses.SUCC,
  })),
  on(userRegisterFailure, (state, { message }) => ({
    ...state,
    register: {
      message: message,
    },
    error: message,
    status: EStatuses.FAIL,
  })),

  // $ ADD TO LIST
  on(addItem, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),

  on(addItemSuccess, (state, { item }) => {
    item = { ...item, isAdded: !item.isAdded };
    if (item.type === EMovieTypes.MOVIE) {
      return {
        ...state,
        user: {
          ...state.user,
          movies: [...state.user.movies, item],
        },
        status: EStatuses.SUCC,
      };
    }
    return {
      ...state,
      user: {
        ...state.user,
        tvShows: [...state.user.tvShows, item],
      },
      status: EStatuses.SUCC,
    };
  }),
  on(addItemFailure, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  })),

  // $ SUGGEST ME
  on(suggestItem, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  on(suggestItemSuccess, (state, { item }) => ({
    ...state,
    user: {
      ...state.user,
      manual_suggestions: [
        ...state.user.manual_suggestions,
        { ...item, isManualSuggestion: true },
      ],
    },
    status: EStatuses.SUCC,
  })),
  on(suggestItemFailure, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  })),

  // $LOGOUT
  on(logoutUser, (_state) => ({
    user: {
      email: '',
      expiresIn: '',
      idToken: '',
      manual_suggestions: [] as IMovie[],
      tvShows: [] as IMovie[],
      suggestions: [] as IMovie[],
      username: '',
      roles: [],
      movies: [] as IMovie[],
    } as IUser,
    error: null,
    status: EStatuses.PEND,
  }))
);
