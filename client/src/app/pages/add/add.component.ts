import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UiDataService } from './../../shared/services/ui-data.service';
import { selectUserTvShows } from 'src/app/state/user/user.selectors';
import { selectUserMovies } from './../../state/user/user.selectors';
import { addItem } from './../../state/user/user.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, zip } from 'rxjs';
import {
  ESearchInputSettings,
  IAppState,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public movies$: Observable<IMovie[]>;
  public searchInput: FormGroup;
  public value: string;
  public isAddToList: boolean;
  public EInputSettings = ESearchInputSettings;

  constructor(
    private store: Store<IAppState>,
    private uiDataService: UiDataService
  ) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    this.movies$ = this.store
      .select(selectMoviesAndTvShows)
      .pipe(
        switchMap((movies) =>
          zip(
            this.store.select(selectUserMovies),
            this.store.select(selectUserTvShows)
          ).pipe(
            map(([userMovies, userTvShows]) =>
              movies.filter(
                (m) =>
                  ![...userMovies, ...userTvShows].find((e) => e.id === m.id)
                    ?.isAdded
              )
            )
          )
        )
      );

    this.searchInput = this.uiDataService.inputField();
    this.isAddToList = true;
  }
  public handleSubmit(): void {
    this.value = this.searchInput.value.value;
  }
  public handleOnAddMovie(movie: IMovie): void {
    this.store.dispatch(addItem({ item: movie }));
  }

  public trackByMovies(_index: number, item: IMovie): number {
    return item.id;
  }
}
