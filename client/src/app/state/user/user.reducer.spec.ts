import {
  EStatuses,
  IMovie,
  IResponse,
  IUser,
  IUserState,
} from './../../shared/interfaces/interface';
import * as fromReducer from './user.reducer';
import * as UserActions from './user.actions';

describe('UserReducer', () => {
  const { initialState } = fromReducer;
  const { userReducer } = fromReducer;

  const dummyError = { error: 'Error' };
  const dummyResponse = {
    message: 'msg',
  } as IResponse;

  describe('unknown action', () => {
    const action = {
      type: 'Unknown',
    };
    const state = userReducer(initialState, action);

    it('Should return the default state', () => {
      expect(state).toBe(initialState);
    });
  });

  describe('addItem action', () => {
    const dummyMovie = {} as IMovie;
    const action = UserActions.addItem({ item: dummyMovie });
    const state = userReducer(initialState, action);

    it('Should change status to LOAD', () => {
      expect(state.status).toBe(EStatuses.LOAD);
    });
    it('Should shouldn`t change anything except status', () => {
      expect(state).toEqual({ ...initialState, status: EStatuses.LOAD });
    });
  });

  describe('addItemSuccess action', () => {
    const dummyMovie = { type: 'movie', isAdded: false } as IMovie;
    const addedDummyMovie = { ...dummyMovie, isAdded: !dummyMovie.isAdded };

    const newState = {
      ...initialState,
      user: {
        ...initialState.user,
        movies: [...initialState.user.movies, addedDummyMovie],
      },
      status: EStatuses.SUCC,
    } as IUserState;

    const action = UserActions.addItemSuccess({ item: dummyMovie });
    const state = userReducer(initialState, action);

    it('Should update the state in an immutable way', () => {
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('Should add the movie and change status to SUCC', () => {
      expect(state.user.movies).toContain(addedDummyMovie);
    });
    it('Should change status to SUCC', () => {
      expect(state.status).toBe(EStatuses.SUCC);
    });
  });

  describe('addItemFailure action', () => {
    const action = UserActions.addItemFailure(dummyError);
    const state = userReducer(initialState, action);

    it('Should save an error message', () => {
      expect(state.error).toBeTruthy();
    });
    it('Should change status to FAIL', () => {
      expect(state.status).toBe(EStatuses.FAIL);
    });
  });

  describe('loginUser action', () => {
    const dummyCreds = {
      email: '',
      password: '',
    };
    const action = UserActions.loginUser(dummyCreds);
    const state = userReducer(initialState, action);

    it('Should change status to LOAD', () => {
      expect(state.status).toBe(EStatuses.LOAD);
    });
    it('Should shouldn`t change anything except status', () => {
      expect(state).toEqual({ ...initialState, status: EStatuses.LOAD });
    });
  });

  describe('loginUserSuccess action', () => {
    const dummyUser = {} as IUser;

    const action = UserActions.loginUserSuccess({ data: dummyUser });
    const state = userReducer(initialState, action);

    it('Should set user property with received data', () => {
      expect(state.user).toEqual(dummyUser);
    });

    it('Should change status to SUCC', () => {
      expect(state.status).toBe(EStatuses.SUCC);
    });
  });

  describe('loginUserFailure action', () => {
    const action = UserActions.loginUserFailure(dummyError);
    const state = userReducer(initialState, action);

    it('Should save an error message', () => {
      expect(state.error).toBeTruthy();
    });
    it('Should change status to FAIL', () => {
      expect(state.status).toBe(EStatuses.FAIL);
    });
  });

  describe('userRegister action', () => {
    const dummyCreds = {
      email: '',
      password: '',
      username: '',
    };
    const action = UserActions.userRegister(dummyCreds);
    const state = userReducer(initialState, action);

    it('Should change status to LOAD', () => {
      expect(state.status).toBe(EStatuses.LOAD);
    });
    it('Should shouldn`t change anything except status', () => {
      expect(state).toEqual({ ...initialState, status: EStatuses.LOAD });
    });
  });

  describe('userRegisterSuccess action', () => {
    const action = UserActions.userRegisterSuccess(dummyResponse);
    const state = userReducer(initialState, action);

    it('Should set register property with received data', () => {
      expect(state.register).toEqual(dummyResponse);
    });
    it('Should set error property with received data', () => {
      expect(state.error).toBeNull();
    });

    it('Should change status to SUCC', () => {
      expect(state.status).toBe(EStatuses.SUCC);
    });
  });

  describe('userRegisterFailure action', () => {
    const action = UserActions.userRegisterFailure(dummyResponse);
    const state = userReducer(initialState, action);

    it('Should save an error message', () => {
      expect(state.register).toBeTruthy();
    });
    it('Should change status to FAIL', () => {
      expect(state.status).toBe(EStatuses.FAIL);
    });
  });

  describe('logoutUser action', () => {
    const action = UserActions.logoutUser();
    const state = userReducer(initialState, action);
    it('Should clear IUserState', () => {
      expect(state).toEqual(initialState);
    });
  });
});
