import { ESearchInputSettings } from '../../shared/interfaces/interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<IAppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initPage();
  }
  private initPage(): void {
    this.movies$ = this.store.select(selectMoviesAndTvShows);
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
