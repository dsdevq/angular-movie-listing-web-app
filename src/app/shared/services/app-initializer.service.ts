import { loadMovies, loadTvShows } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private store: Store<IAppState>) {}

  public init = () =>
    new Promise<void>((resolve) => {
      this.store.dispatch(loadMovies());
      this.store.dispatch(loadTvShows());
      resolve();
    });
}
