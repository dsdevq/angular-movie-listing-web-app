import { loginUserSuccess, authUser } from './../../state/user/user.actions';
import { loadMovies, loadTvShows } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private store: Store<IAppState>) {}

  public init = () =>
    new Promise<void>((resolve) => {
      this.store.dispatch(loadMovies());
      this.store.dispatch(loadTvShows());
      let token = localStorage.getItem('id_token');
      if (token) {
        this.store.dispatch(authUser());
      }
      resolve();
    });
}
