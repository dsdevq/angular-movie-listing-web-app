import { FormBuilder, FormGroup } from '@angular/forms';
import { selectAllTvShows } from './../../state/tv-shows/tv-shows.selectors';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';
import { Store } from '@ngrx/store';
import { Observable, switchMap, map, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interface';
import { loadMovies } from 'src/app/state/movies/movies.actions';
import { loadTvShows } from 'src/app/state/tv-shows/tv-shows.actions';

@Component({
  selector: 'app-suggest-me',
  templateUrl: './suggest-me.component.html',
  styleUrls: ['./suggest-me.component.scss'],
})
export class SuggestMeComponent implements OnInit {
  public movies$: Observable<IMovie[]>;
  public searchInput: FormGroup;
  public value: string;

  constructor(private store: Store<IAppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    this.movies$ = this.store.select(selectAllMovies).pipe(
      tap((e) => !e.length && this.store.dispatch(loadMovies())),
      switchMap((movies) =>
        this.store.select(selectAllTvShows).pipe(
          tap((e) => !e.length && this.store.dispatch(loadTvShows())),
          map((tvShows) => [...movies, ...tvShows])
        )
      )
    );
    this.searchInput = this.fb.group({
      value: '',
    });
  }
  public handleSubmit(): void {
    if (this.searchInput.value.value.trim()) {
      this.value = this.searchInput.value.value;
    }
  }
}
