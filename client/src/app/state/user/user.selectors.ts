import { IAppState, IUserState } from '../../shared/interfaces/interface';
import { createSelector } from '@ngrx/store';

export const selectUser = (state: IAppState) => state.user;
export const selectUserData = createSelector(
  selectUser,
  (state: IUserState) => state.user
);
export const selectUserMovies = createSelector(
  selectUser,
  (state: IUserState) => state.user.movies
);
export const selectUserTvShows = createSelector(
  selectUser,
  (state: IUserState) => state.user.tvShows
);
export const selectUserStatus = createSelector(
  selectUser,
  (state: IUserState) => state.status
);
export const selectUserManualSuggestions = createSelector(
  selectUser,
  (state: IUserState) => state.user.manual_suggestions
);
export const selectUserSuggestions = createSelector(
  selectUser,
  (state: IUserState) => state.user.suggestions
);
// !!
export const selectUserRegisterStatus = createSelector(
  selectUser,
  (state: IUserState) => state.register
);
