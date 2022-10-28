import {
  loadTvShows,
  loadTvShowsFail,
  loadTvShowsSucc,
} from './tv-shows.actions';
import { HttpService } from '../../shared/services/http.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TvShowsEffects {
  loadTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTvShows),
      switchMap(() =>
        // Call the getTvShows method, it returns an observable
        this.http.getTvShows().pipe(
          // Take the returned value and return a new success action containing tvShows
          map((tvShows) => loadTvShowsSucc({ tvShows })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTvShowsFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpService) {}
}
