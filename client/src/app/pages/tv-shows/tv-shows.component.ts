import { HttpService } from './../../shared/services/http.service';
import { EMovieTypes } from './../../shared/interfaces/interface';
import { loadMoviesTvShows } from './../../state/movies/movies.actions';
import { AuthService } from './../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EPages, IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { selectAllTvShows } from 'src/app/state/movies/movies.selectors';
import { selectUserTvShows } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  public tvShowsInfo$: Observable<IMovie[]>;
  public isLogged$: Observable<boolean>;
  public EPages = EPages;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.initTvShows();
  }

  private initTvShows(): void {
    this.isLogged$ = this.authService.isLoggedIn$;
    this.tvShowsInfo$ = this.store.select(
      this.authService.isLoggedIn() ? selectUserTvShows : selectAllTvShows
    );
  }
  public handleClick(): void {
    this.store.dispatch(
      loadMoviesTvShows({
        itemType: EMovieTypes.TV,
        page: this.http.tvShowsPage,
      })
    );
  }
}
