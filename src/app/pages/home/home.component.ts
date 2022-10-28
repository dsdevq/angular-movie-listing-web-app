import { HttpService } from '../../shared/services/http.service';
import { loadTvShows } from './../../state/tv-shows/tv-shows.actions';
import { loadMovies } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ENavItems, IAppState, IMovie } from 'src/app/shared/interface';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';

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
      map((e: FormControl) => e.value)
    );
  }

  public handleTabChange(e: MatTabChangeEvent) {
    this.movies$ = this.http.tabChange(e.tab.textLabel);
  }
}
