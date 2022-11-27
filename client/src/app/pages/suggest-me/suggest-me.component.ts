import { UiDataService } from './../../shared/services/ui-data.service';
import { selectUserManualSuggestions } from './../../state/user/user.selectors';
import { suggestItem } from './../../state/user/user.actions';
import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { FormGroup } from '@angular/forms';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';
import { Store } from '@ngrx/store';
import { Observable, map, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-suggest-me',
  templateUrl: './suggest-me.component.html',
  styleUrls: ['./suggest-me.component.scss'],
})
export class SuggestMeComponent implements OnInit {
  public movies$: Observable<IMovie[]>;
  public searchInput: FormGroup;
  public value: string;
  public EInputSettings = ESearchInputSettings;
  public isSuggest: boolean;

  constructor(
    private store: Store<IAppState>,
    private uiDataService: UiDataService
  ) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    const items$ = this.store.select(selectMoviesAndTvShows);
    const userItems$ = this.store.select(selectUserManualSuggestions);

    this.movies$ = combineLatest([items$, userItems$]).pipe(
      map(([items, userItems]) =>
        !userItems.length
          ? items
          : items.map((movie: IMovie) => {
              let find = userItems.find((e: IMovie) => e.id === movie.id);
              return {
                ...movie,
                isManualSuggestion: find?.isManualSuggestion,
              };
            })
      )
    );
    this.searchInput = this.uiDataService.inputField();
    this.isSuggest = true;
  }
  public handleSubmit(): void {
    this.value = this.searchInput.value.value;
  }

  public handleOnSuggestMovie(movie: IMovie): void {
    this.store.dispatch(suggestItem({ item: movie }));
  }
}
