import { IAppState, IMovieDetailsState } from './../../shared/interface';
import { createSelector } from '@ngrx/store';

export const selectItem = (state: IAppState) => state.selectedState;
export const selectItemData = createSelector(
  selectItem,
  (state: IMovieDetailsState) => state.selected
);
export const getSelectStatus = createSelector(
  selectItem,
  (state: IMovieDetailsState) => state.status
);
