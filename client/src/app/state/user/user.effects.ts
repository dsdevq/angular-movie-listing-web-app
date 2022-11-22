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
        this.authService.login(email, password).pipe(
          map((response) => loginUserSuccess({ data: response })),
          catchError((error) => of(loginUserFailure({ error })))
        )
      )
    )
  );
  userRegister$ = createEffect(() =>
    this.actions$.pipe(ofType(userRegister)).pipe(
      switchMap(({ username, email, password }) =>
        this.authService.signUp(username, email, password).pipe(
          map(({ message }) => userRegisterSuccess({ message })),
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
        this.authService.getUserData().pipe(
          map((response) => loginUserSuccess({ data: response })),
          catchError(({ message }) => of(loginUserFailure({ error: message })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(ofType(addItem)).pipe(
      switchMap(({ item }) =>
        this.httpService.addItem(item).pipe(
          map(() => addItemSuccess({ item })),
          catchError((error) => of(addItemFailure({ error })))
        )
      )
    )
  );

  addItemSucc$ = createEffect(() =>
    this.actions$.pipe(ofType(addItemSuccess)).pipe(
      map(({ item }) => addMovieTvShow({ id: item.id })),
      catchError((error) => of(addItemFailure({ error })))
    )
  );

  suggestSomeone$ = createEffect(() =>
    this.actions$.pipe(ofType(suggestItem)).pipe(
      switchMap(({ item }) =>
        this.httpService.suggestItem(item).pipe(
          map(() =>
            this.authService.isLoggedIn()
              ? suggestItemSuccess({ item })
              : suggestItemSuccessNotLogged({ item })
          ),
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
        catchError((error) => of(suggestItemFailure({ error })))
      )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private httpService: HttpService
  ) {}
}
