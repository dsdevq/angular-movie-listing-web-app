import { AuthService } from 'src/app/shared/services/auth.service';
import { loginUser, loginUserFailure, loginUserSuccess } from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  userLogin$ = createEffect(() =>
    this.actions$.pipe(ofType(loginUser)).pipe(
      switchMap(({ email, password }) =>
        // Call the getMovies method, it returns an observable
        this.authService.login(email, password).pipe(
          // Take the returned value and return a new success action containing movies
          map((response) => loginUserSuccess({ data: response })),

          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );

  // ! TODO
  // userLogout$ = createEffect(() => this.actions$.pipe())

  constructor(private actions$: Actions, private authService: AuthService) {}
}
