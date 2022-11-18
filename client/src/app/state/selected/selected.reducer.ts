import {
  loadSelect,
  loadSelectSucc,
  loadSelectFail,
  removeSelect,
} from './selected.actions';
import {
  IMovieDetailsState,
  IMovieDetails,
  EStatuses,
} from '../../shared/interfaces/interface';
import { createReducer, on } from '@ngrx/store';

export const initialState: IMovieDetailsState = {
  selected: {} as IMovieDetails,
  error: null,
  status: EStatuses.PEND,
};

export const selectReducer = createReducer(
  initialState,
  on(loadSelect, (state) => ({
    ...state,
    status: EStatuses.LOAD,
  })),
  on(loadSelectSucc, (state, { selected }) => ({
    ...state,
    selected,
    status: EStatuses.SUCC,
  })),
  on(loadSelectFail, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  })),
  on(removeSelect, (_state) => ({
    selected: {} as IMovieDetails,
    error: null,
    status: EStatuses.PEND,
  }))
);
