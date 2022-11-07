import { AuthService } from 'src/app/shared/services/auth.service';
import {
  addItem,
  addItemSuccess,
  authUser,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
} from './user.actions';
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

  userAuth$ = createEffect(() =>
    this.actions$.pipe(ofType(authUser)).pipe(
      switchMap(() =>
        // Call the getMovies method, it returns an observable
        this.authService.getUserData().pipe(
          // Take the returned value and return a new success action containing movies
          map((response) => loginUserSuccess({ data: response })),

          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(ofType(addItem)).pipe(
      switchMap(({ item }) =>
        // Call the getMovies method, it returns an observable
        this.authService.addItem(item).pipe(
          // Take the returned value and return a new success action containing movies
          map(() => addItemSuccess({ item })),

          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
