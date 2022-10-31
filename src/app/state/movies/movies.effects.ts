import { HttpService } from '../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { loadMovies, loadMoviesFail, loadMoviesSucc } from './movies.actions';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      switchMap(() =>
        // Call the getMovies method, it returns an observable
        this.http.getMovies().pipe(
          // Take the returned value and return a new success action containing movies
          map((movies) => loadMoviesSucc({ movies })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadMoviesFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpService) {}
}
