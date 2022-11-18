import { UiDataService } from './../../shared/services/ui-data.service';
import { EMovieTypes } from './../../shared/interfaces/interface';
import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';
import { HttpService } from '../../shared/services/http.service';
import {
  loadMoviesAndTvShows,
  loadMoviesTvShows,
} from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  ENavItems,
  IAppState,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public ENavItemsArray: string[];
  public inputField: FormGroup;
  public value$: Observable<string>;
  public movies$: Observable<IMovie[]>;
  private selectedTab: string;

  public EInputSettings = ESearchInputSettings;

  constructor(
    private store: Store<IAppState>,
    private http: HttpService,
    private uiDataService: UiDataService
  ) {}

  ngOnInit(): void {
    this.initHomePage();
  }
  private initHomePage(): void {
    this.movies$ = this.store.select(selectMoviesAndTvShows);
    this.ENavItemsArray = Object.values(ENavItems);
    this.inputField = this.uiDataService.inputField();
    this.value$ = this.uiDataService.newValueChanges(
      this.inputField.valueChanges
    );
  }

  public handleTabChange(e: MatTabChangeEvent): void {
    this.selectedTab = e.tab.textLabel;
    this.movies$ = this.http.tabChange(this.selectedTab);
  }

  public handleClick(): void {
    if (this.selectedTab === ENavItems.MOVIES) {
      this.store.dispatch(
        loadMoviesTvShows({
          itemType: EMovieTypes.MOVIE,
          page: this.http.moviesPage,
        })
      );
      return;
    }
    if (this.selectedTab === ENavItems.TV_SHOWS) {
      this.store.dispatch(
        loadMoviesTvShows({
          itemType: EMovieTypes.TV,
          page: this.http.tvShowsPage,
        })
      );
      return;
    }
    this.store.dispatch(
      loadMoviesAndTvShows({
        moviePage: this.http.moviesPage,
        tvShowPage: this.http.tvShowsPage,
      })
    );
  }
}
