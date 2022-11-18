import * as UserSelectors from './user.selectors';
import { IUser, IUserState } from './../../shared/interfaces/interface';
describe('UserSelectors', () => {
  const dummyUserState = {
    user: {} as IUser,
  } as IUserState;
  describe('selectUserData selector', () => {
    const result = UserSelectors.selectUserData.projector(dummyUserState);
    it('Should return userState user data', () => {
      expect(result).toEqual(dummyUserState.user);
    });
  });
  describe('selectUserMovies selector', () => {
    const result = UserSelectors.selectUserMovies.projector(dummyUserState);
    it('Should return userState user movies', () => {
      expect(result).toEqual(dummyUserState.user.movies);
    });
  });

  describe('selectUserTvShows selector', () => {
    const result = UserSelectors.selectUserTvShows.projector(dummyUserState);
    it('Should return userState user tvShows', () => {
      expect(result).toEqual(dummyUserState.user.tvShows);
    });
  });
  describe('selectUserManualSuggestions selector', () => {
    const result =
      UserSelectors.selectUserManualSuggestions.projector(dummyUserState);
    it('Should return userState user manual suggestions', () => {
      expect(result).toEqual(dummyUserState.user.manual_suggestions);
    });
  });
  describe('selectUserStatus selector', () => {
    const result = UserSelectors.selectUserStatus.projector(dummyUserState);
    it('Should return userState status', () => {
      expect(result).toEqual(dummyUserState.status);
    });
  });
  describe('selectUserSuggestions selector', () => {
    const result =
      UserSelectors.selectUserSuggestions.projector(dummyUserState);
    it('Should return userState user suggestions', () => {
      expect(result).toEqual(dummyUserState.user.suggestions);
    });
  });
  describe('selectUserRegisterStatus selector', () => {
    const result =
      UserSelectors.selectUserRegisterStatus.projector(dummyUserState);
    it('Should return userState register', () => {
      expect(result).toEqual(dummyUserState.register);
    });
  });
});
