import { Router } from '@angular/router';
import { IResponse } from './../interfaces/interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IAppState, IUser } from '../interfaces/interface';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthService', () => {
  let service: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const initialState: IAppState = {} as IAppState;
  let routerSpy = { navigate: jasmine.createSpy('dashboard') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: routerSpy,
        },
        provideMockStore({ initialState }),
      ],
    });
    injector = getTestBed();
    service = injector.inject(AuthService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserData method', () => {
    it('Should get user data and return an Observable<IUser>', () => {
      const dummyUser: IUser = {} as IUser;
      service.getUserData().subscribe((user: IUser) => {
        expect(user).toEqual(dummyUser);
      });
      const req = httpMock.expectOne(`${service.BASE_URL}/data`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUser);
    });
  });

  describe('loginSuccess method', () => {
    it('Should post credentials and return an Observable<IUser>', () => {
      const dummyCreds = {
        email: 'testuser@gmail.com',
        password: 'Darkfly21',
      };
      const dummyUser = {} as IUser;
      service
        .login(dummyCreds.email, dummyCreds.password)
        .subscribe((user: IUser) => {
          expect(user).toEqual(dummyUser);
        });
      const req = httpMock.expectOne(`${service.BASE_URL}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyUser);
    });
  });

  describe('signUpSuccess method', () => {
    it('Should post credentials and return an Observable<IResponse>', () => {
      const dummyCreds = {
        username: 'NewUser1',
        email: 'newuser1@gmail.com',
        password: 'Darkfly21',
      };
      const dummyResponse: IResponse = {
        message: 'TestMessage2',
      };
      service
        .signUp(dummyCreds.email, dummyCreds.password, dummyCreds.username)
        .subscribe((response) => {
          expect(response.message).toBeInstanceOf(String);
        });
      const req = httpMock.expectOne(`${service.BASE_URL}/registration`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });
});
