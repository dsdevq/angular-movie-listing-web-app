import { HttpService } from '../../shared/services/http.service';
import { loadTvShows } from './../../state/tv-shows/tv-shows.actions';
import { loadMovies } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ENavItems, IAppState, IMovie } from 'src/app/shared/interface';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, map, distinctUntilChanged, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public ENavItem = ENavItems;
  public inputField: FormGroup;
  public value$: Observable<string>;
  public movies$: Observable<IMovie[]> = this.http.tabChange(this.ENavItem.ALL);
  public selectedTab: string;

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
    this.store.dispatch(loadMovies());
    this.store.dispatch(loadTvShows());
    this.inputField = this.fb.group({
      value: '',
    });
    this.value$ = this.inputField.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      map((e: FormControl) => e.value)
    );
  }

  public handleTabChange(e: MatTabChangeEvent) {
    this.movies$ = this.http.tabChange(e.tab.textLabel);
    this.selectedTab = e.tab.textLabel;
  }

  public handleClick() {
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
