import { IAppState, IUserState } from '../../shared/interfaces/interface';
import { createSelector } from '@ngrx/store';

export const selectUser = (state: IAppState) => state.user;
export const selectUserData = createSelector(
  selectUser,
  (state: IUserState) => state.user
);
