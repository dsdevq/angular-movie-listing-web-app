import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';
import { HttpService } from '../../shared/services/http.service';
import { loadMovies, loadTvShows } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  ENavItems,
  IAppState,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
  Observable,
  map,
  distinctUntilChanged,
  debounceTime,
  catchError,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public ENavItemsArray: string[];
  public inputField: FormGroup;
  public value$: Observable<string> | null;
  public movies$: Observable<IMovie[]>;
  public selectedTab: string;

  public EInputSettings = ESearchInputSettings;

  constructor(
    private store: Store<IAppState>,
    private http: HttpService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initHomePage();
  }
  // !!!!!
  private initHomePage(): void {
    this.movies$ = this.store.select(selectMoviesAndTvShows);
    this.ENavItemsArray = Object.values(ENavItems);
    this.inputField = this.fb.group({
      value: '',
    });

    this.value$ = this.inputField.valueChanges.pipe(
      debounceTime(300),
      map((e: FormControl) => e.value),
      distinctUntilChanged(),
      catchError((e) => {
        throw new Error(`Error! ${e}`);
      })
    );
  }

  public handleTabChange(e: MatTabChangeEvent): void {
    this.movies$ = this.http.tabChange(e.tab.textLabel);
    this.selectedTab = e.tab.textLabel;
  }

  public handleClick(): void {
    // !!!!!!
    if (this.selectedTab === ENavItems.MOVIES) {
      this.store.dispatch(loadMovies());
      return;
    }
    if (this.selectedTab === ENavItems.TV_SHOWS) {
      this.store.dispatch(loadTvShows());
      return;
    }
    this.store.dispatch(loadMovies());
    this.store.dispatch(loadTvShows());
  }
}
