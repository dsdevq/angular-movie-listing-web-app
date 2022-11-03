import { loadMovies } from './../../state/movies/movies.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public moviesInfo$: Observable<IMovie[]>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initMovies();
  }
  private initMovies(): void {
    this.moviesInfo$ = this.store.select(selectAllMovies);
  }
  public handleClick(): void {
    this.store.dispatch(loadMovies());
  }
}
