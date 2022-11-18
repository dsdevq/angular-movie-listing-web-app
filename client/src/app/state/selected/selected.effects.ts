import { HttpService } from '../../shared/services/http.service';
import { loadSelect, loadSelectSucc, loadSelectFail } from './selected.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectEffects {
  selectItem$ = createEffect(() =>
    this.actions$.pipe(ofType(loadSelect)).pipe(
      switchMap(({ url, itemType }) =>
        // Call the getMovies method, it returns an observable
        this.http.getItemDetails(url).pipe(
          // Take the returned value and return a new success action containing movies
          map((item) =>
            loadSelectSucc({
              selected: {
                ...item,
                type: itemType,
                title: item.name || item.title,
              },
            })
          ),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadSelectFail({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private http: HttpService) {}
}
