import { HttpService } from './http.service';
import { authUser } from './../../state/user/user.actions';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../interfaces/interface';
import { loadMoviesAndTvShows } from 'src/app/state/movies/movies.actions';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private store: Store<IAppState>,
    private httpService: HttpService
  ) {}

  public init = () =>
    new Promise<void>((resolve) => {
      let token = localStorage.getItem('id_token');
      if (token) {
        this.store.dispatch(authUser());
      }
      this.store.dispatch(
        loadMoviesAndTvShows({
          moviePage: this.httpService.moviesPage,
          tvShowPage: this.httpService.tvShowsPage,
        })
      );
      resolve();
    });
}
