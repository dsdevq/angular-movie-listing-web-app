import { EStatuses } from './../../shared/interface';
import {
  loadTvShows,
  loadTvShowsSucc,
  loadTvShowsFail,
} from './tv-shows.actions';
import { createReducer, on } from '@ngrx/store';
import { ITvShowsState } from 'src/app/shared/interface';

export const initialState: ITvShowsState = {
  tvShows: [],
  error: null,
  status: EStatuses.PEND,
};

export const tvShowsReducer = createReducer(
  // Supply the initial state
  initialState,
  // Trigger loading the tvShows
  on(loadTvShows, (state) => ({ ...state, status: EStatuses.LOAD })),
  // Handle successfully loaded tvShows
  on(loadTvShowsSucc, (state, { tvShows }) => ({
    ...state,
    tvShows,
    error: null,
    status: EStatuses.SUCC,
  })),
  // Handle tvShows load failure
  on(loadTvShowsFail, (state, { error }) => ({
    ...state,
    error,
    status: EStatuses.FAIL,
  }))
);
