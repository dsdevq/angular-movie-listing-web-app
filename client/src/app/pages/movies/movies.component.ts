import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PageComponent } from './../../components/page/page.component';
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
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public moviesInfo$: Observable<IMovie[]>;
  public EPages = EPages;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.initMovies();
  }
  private initMovies(): void {
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
