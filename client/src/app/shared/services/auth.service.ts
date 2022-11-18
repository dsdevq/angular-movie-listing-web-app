import { logoutUser } from './../../state/user/user.actions';
import { Store } from '@ngrx/store';
import {
  IUser,
  IAppState,
  IResponse,
} from 'src/app/shared/interfaces/interface';
import { Router } from '@angular/router';
import { shareReplay, tap, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:5000/auth';
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isLoggedIn()
  );
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>,
    private route: Router
  ) {}

  public login = (email: string, password: string): Observable<IUser> =>
    this.http
      .post<IUser>(`${this.BASE_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((e) => {
          this.setSession(e);
        }),
        shareReplay()
      );

  public signUp = (
    username: string,
    email: string,
    password: string
  ): Observable<IResponse> =>
    this.http
      .post<IResponse>(`${this.BASE_URL}/registration`, {
        username,
        email,
        password,
      })
      .pipe(shareReplay());

  private setSession = (authResult: IUser): void => {
    localStorage.setItem('id_token', authResult.idToken);
    this.route.navigate(['/dashboard']);
    this._isLoggedIn$.next(true);
  };

  public logout = (): void => {
    localStorage.clear();
    this.store.dispatch(logoutUser());
    this._isLoggedIn$.next(false);
    this.route.navigate(['/']);
  };

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('id_token');
  }

  public getUserData = (): Observable<IUser> =>
    this.http.get<IUser>(`${this.BASE_URL}/data`).pipe(shareReplay());
}
