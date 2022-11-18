import { HttpService } from './../../shared/services/http.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  addItem,
  addItemFailure,
  addItemSuccess,
  authUser,
  loginUser,
  loginUserFailure,
  loginUserSuccess,
  suggestItem,
  suggestItemFailure,
  suggestItemSuccess,
  suggestItemSuccessNotLogged,
  userRegister,
  userRegisterFailure,
  userRegisterSuccess,
} from './user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { addMovieTvShow, suggestMovieTvShow } from '../movies/movies.actions';

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
  userRegister$ = createEffect(() =>
    this.actions$.pipe(ofType(userRegister)).pipe(
      switchMap(({ username, email, password }) =>
        // Call the getMovies method, it returns an observable
        this.authService.signUp(username, email, password).pipe(
          // Take the returned value and return a new success action containing movies
          map(({ message }) => userRegisterSuccess({ message })),

          // Or... if it errors return a new failure action containing the error
          catchError(({ message }) => {
            return of(userRegisterFailure({ message }));
          })
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
        this.httpService.addItem(item).pipe(
          // Take the returned value and return a new success action containing movies
          map(() => addItemSuccess({ item })),

          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(addItemFailure({ error })))
        )
      )
    )
  );

  addItemSucc$ = createEffect(() =>
    this.actions$.pipe(ofType(addItemSuccess)).pipe(
      map(({ item }) => addMovieTvShow({ id: item.id })),
      // Or... if it errors return a new failure action containing the error
      catchError((error) => of(addItemFailure({ error })))
    )
  );

  suggestSomeone$ = createEffect(() =>
    this.actions$.pipe(ofType(suggestItem)).pipe(
      switchMap(({ item }) =>
        // Call the getMovies method, it returns an observable
        this.httpService.suggestItem(item).pipe(
          // Take the returned value and return a new success action containing movies
          map(() =>
            this.authService.isLoggedIn()
              ? suggestItemSuccess({ item })
              : suggestItemSuccessNotLogged({ item })
          ),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(suggestItemFailure({ error })))
        )
      )
    )
  );

  suggestSomeOneSucc$ = createEffect(() =>
    this.actions$
      .pipe(ofType(suggestItemSuccess, suggestItemSuccessNotLogged))
      .pipe(
        map(({ item }) => suggestMovieTvShow({ id: item.id })),
        // Or... if it errors return a new failure action containing the error
        catchError((error) => of(suggestItemFailure({ error })))
      )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private httpService: HttpService
  ) {}
}
