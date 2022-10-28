import { IAppState, ITvShowsState } from 'src/app/shared/interface';
import { createSelector } from '@ngrx/store';

export const selectTvShows = (state: IAppState) => state.tvShowsState;
export const selectAllTvShows = createSelector(
  selectTvShows,
  (state: ITvShowsState) => state.tvShows
);
