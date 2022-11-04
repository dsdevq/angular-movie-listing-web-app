import { Router } from '@angular/router';
import { shareReplay, tap, Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/interface';
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
          this.route.navigate(['/']);
        }),
        shareReplay()
      );
  }
  private setSession(authResult: IUser): void {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(authResult.expiresIn));
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('roles', JSON.stringify(authResult.roles));
    this._isLoggedIn$.next(true);
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this._isLoggedIn$.next(false);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('id_token');
    if (token) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
    }
    throw new Error('No expiration');
  }
}
