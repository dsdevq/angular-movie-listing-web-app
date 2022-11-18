import { EMovieTypes } from './../../shared/interfaces/interface';
import { HttpService } from '../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
  loadMoviesAndTvShows,
  loadMoviesTvFail,
  loadMoviesTvShows,
  loadMoviesTvSucc,
} from './movies.actions';

@Injectable()
export class MovieEffects {
  loadMoviesAndTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoviesAndTvShows),
      switchMap(({ moviePage, tvShowPage }) =>
        // Call the getMovies method, it returns an observable
        zip([
          this.http.getItems(moviePage, EMovieTypes.MOVIE),
          this.http.getItems(tvShowPage, EMovieTypes.TV),
        ]).pipe(
          // Take the returned value and return a new success action containing movies
          map(([movies, tvShows]) =>
            loadMoviesTvSucc({ movies: [...movies, ...tvShows] })
          ),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadMoviesTvFail({ error })))
        )
      )
    )
  );
  loadMoviesTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoviesTvShows),
      switchMap(({ page, itemType }) =>
        // Call the getMovies method, it returns an observable
        this.http.getItems(page, itemType).pipe(
          // Take the returned value and return a new success action containing movies
          map((movies) => loadMoviesTvSucc({ movies })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadMoviesTvFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpService) {}
}
