import { selectAllTvShows } from './../../state/tv-shows/tv-shows.selectors';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';
import { Store } from '@ngrx/store';
import { Observable, switchMap, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interface';

@Component({
  selector: 'app-suggest-me',
  templateUrl: './suggest-me.component.html',
  styleUrls: ['./suggest-me.component.scss'],
})
export class SuggestMeComponent implements OnInit {
  public movies$: Observable<IMovie[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    this.movies$ = this.store.select(selectAllMovies).pipe(
      switchMap((movies) => {
        return this.store.select(selectAllTvShows).pipe(
          map((tvShows) => {
            return [...movies, ...tvShows];
          })
        );
      })
    );
  }
}
