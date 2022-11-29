import { DialogPopupComponent } from './../../components/dialog-popup/dialog-popup.component';
import { UiDataService } from './../../shared/services/ui-data.service';
import { selectUserManualSuggestions } from './../../state/user/user.selectors';
import { suggestItem } from './../../state/user/user.actions';
import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { FormGroup } from '@angular/forms';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';
import { Store } from '@ngrx/store';
import { Observable, map, combineLatest, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { MatDialog } from '@angular/material/dialog';

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
    private uiDataService: UiDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    this.dialog.open(DialogPopupComponent, {
      panelClass: 'modal',
    });
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

  public openDialog() {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: '100%',
      panelClass: 'modal',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
  }

  public handleOnSuggestMovie(movie: IMovie): void {
    this.store.dispatch(suggestItem({ item: movie }));
  }
}
