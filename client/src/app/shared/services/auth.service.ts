import { IMovie, IResponse } from 'src/app/shared/interfaces/interface';
import { IUser } from './../interfaces/interface';
import { Router } from '@angular/router';
import { shareReplay, tap, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject(this.isLoggedIn());
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private route: Router
  ) {}

  public login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>('http://localhost:5000/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((e) => {
          this.setSession(e);
          this.route.navigate(['/dashboard']);
        }),
        // tap((e) => {
        //   this.setSession(e);
        //   this.route.navigate(['/dashboard']);
        // }),
        shareReplay()
      );
  }
  private setSession(authResult: IUser): void {
    localStorage.setItem('id_token', authResult.idToken);
    this._isLoggedIn$.next(true);
  }

  public logout(): void {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this.route.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('id_token');
    if (token) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  public getUserData(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:5000/auth/data');
  }

  public addItem(movie: IMovie): Observable<IResponse> {
    return this.http.post<IResponse>('http://localhost:5000/auth/movie', movie);
  }
}
