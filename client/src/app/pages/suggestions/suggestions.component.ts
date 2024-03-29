import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { selectAllMovies } from 'src/app/state/movies/movies.selectors';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  public movies$: Observable<IMovie[]>;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.init();
  }
  private init(): void {
    this.movies$ = this.store.select(selectAllMovies);
  }
}
