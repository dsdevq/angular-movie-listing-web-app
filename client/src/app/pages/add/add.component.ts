import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ESearchInputSettings,
  IAppState,
  IMovie,
} from 'src/app/shared/interfaces/interface';
import { selectMoviesAndTvShows } from 'src/app/state/movies/movies.selectors';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
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
