import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  IAppState,
  IUser,
  IResponse,
  IMovie,
  IUserState,
} from './../../shared/interfaces/interface';
import { Observable } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { HttpService } from 'src/app/shared/services/http.service';
import { provideMockActions } from '@ngrx/effects/testing';
import * as UserActions from './user.actions';
import { addMovieTvShow, suggestMovieTvShow } from '../movies/movies.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';

interface ILogin {
  email: string;
  password: string;
}

interface ISignUp extends ILogin {
  username: string;
}

interface IDummy {
  login: ILogin;
  user: IUser;
  movie: IMovie;
  signUp: ISignUp;
  response: IResponse;
}

describe('UserEffects', () => {
  const initialState: IUserState = {} as IUserState;
  const httpService: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    'httpService',
    ['addItem', 'suggestItem']
  );
  const authService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['login', 'signUp', 'getUserData', 'isLoggedIn']
  );
  let effects: UserEffects;
  let injector: TestBed;
  let actions: Observable<Action>;
  let store: MockStore<IAppState>;

  let metadata: EffectsMetadata<UserEffects>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
        { provide: HttpService, useValue: httpService },
        { provide: AuthService, useValue: authService },
      ],
    });

    injector = getTestBed();
    effects = injector.inject(UserEffects);
    store = injector.inject(MockStore);
    store.setState({} as IAppState);
    metadata = getEffectsMetadata(effects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  const dummyValues: IDummy = {
    login: {} as ILogin,
    user: {} as IUser,
    movie: {} as IMovie,
    signUp: {} as ISignUp,
    response: {
      message: 'Success!',
    },
  };
  describe('userLogin$', () => {
    it('should handle loginUser and return a loginUserSuccess action', () => {
      const action = UserActions.loginUser(dummyValues.login);
      const outcome = UserActions.loginUserSuccess({ data: dummyValues.user });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.user });
        authService.login.and.returnValue(response);

        expectObservable(effects.userLogin$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('userRegister$', () => {
    it('should handle userRegister and return a userRegisterSuccess action', () => {
      const action = UserActions.userRegister(dummyValues.signUp);
      const outcome = UserActions.userRegisterSuccess({
        message: dummyValues.response.message,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.response });
        authService.signUp.and.returnValue(response);

        expectObservable(effects.userRegister$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('userAuth$', () => {
    it('should handle authUser and return a loginUserSuccess action', () => {
      const action = UserActions.authUser();
      const outcome = UserActions.loginUserSuccess({ data: dummyValues.user });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.user });
        authService.getUserData.and.returnValue(response);

        expectObservable(effects.userAuth$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('addItem$', () => {
    it('should handle addItem and return a addItemSuccess action', () => {
      const action = UserActions.addItem({ item: dummyValues.movie });
      const outcome = UserActions.addItemSuccess({ item: dummyValues.movie });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.response });
        httpService.addItem.and.returnValue(response);

        expectObservable(effects.addItem$).toBe('--b', { b: outcome });
      });
    });

    it('should register addItem$ that dispatches an action', () => {
      expect(metadata.addItem$?.dispatch).toEqual(true);
    });
  });

  describe('addItemSucc$', () => {
    it('should handle addItemSuccess and return a addMovieTvShow action', () => {
      const action = UserActions.addItemSuccess({ item: dummyValues.movie });
      const outcome = addMovieTvShow({ id: dummyValues.movie.id });

      testScheduler.run(({ hot, expectObservable }) => {
        actions = hot('--a', { a: action });

        expectObservable(effects.addItemSucc$).toBe('--b', { b: outcome });
      });
    });

    it('should register addItemSuccess$ dispatches an action', () => {
      expect(metadata.addItemSucc$?.dispatch).toEqual(true);
    });
  });

  describe('suggestSomeone$', () => {
    it('should handle suggestItem and return a suggestItemSuccess action', () => {
      const action = UserActions.suggestItem({ item: dummyValues.movie });
      const outcome = UserActions.suggestItemSuccess({
        item: dummyValues.movie,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.response });
        httpService.suggestItem.and.returnValue(response);
        authService.isLoggedIn.and.returnValue(true);

        expectObservable(effects.suggestSomeone$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('suggestSomeOneSucc$', () => {
    it('should handle suggestItemSuccess and return a suggestMovieTvShow action', () => {
      const action = UserActions.suggestItemSuccess({
        item: dummyValues.movie,
      });
      const outcome = suggestMovieTvShow({ id: dummyValues.movie.id });

      testScheduler.run(({ hot, expectObservable }) => {
        actions = hot('--a', { a: action });

        expectObservable(effects.suggestSomeOneSucc$).toBe('--b', {
          b: outcome,
        });
      });
    });
  });
});
