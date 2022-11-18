import { selectUserMovies } from './../../state/user/user.selectors';
import { HttpService } from './../../shared/services/http.service';
import { EMovieTypes } from './../../shared/interfaces/interface';
import { loadMoviesTvShows } from './../../state/movies/movies.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EPages, IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public moviesInfo$: Observable<IMovie[]>;
  public EPages = EPages;
  public isLogged$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.initMovies();
  }
  private initMovies(): void {
    this.isLogged$ = this.authService.isLoggedIn$;
    this.moviesInfo$ = this.store.select(
      this.authService.isLoggedIn() ? selectUserMovies : selectAllMovies
    );
  }
  public handleClick(): void {
    this.store.dispatch(
      loadMoviesTvShows({
        itemType: EMovieTypes.MOVIE,
        page: this.httpService.moviesPage,
      })
    );
  }
}
