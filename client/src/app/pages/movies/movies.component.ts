import { AuthService } from 'src/app/shared/services/auth.service';
import { loadMovies } from './../../state/movies/movies.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EPages, IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';
import { Observable, map } from 'rxjs';
import { selectUserData } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public moviesInfo$: Observable<IMovie[]>;
  public EPages = EPages;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initMovies();
  }
  private initMovies(): void {
    if (!this.authService.isLoggedIn()) {
      this.moviesInfo$ = this.store.select(selectAllMovies);
      return;
    }
    this.moviesInfo$ = this.store
      .select(selectUserData)
      .pipe(map((user) => user.movies));
  }
  public handleClick(): void {
    this.store.dispatch(loadMovies());
  }
}
