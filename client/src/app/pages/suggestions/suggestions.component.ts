import { selectUserSuggestions } from './../../state/user/user.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { addItem } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
})
export class SuggestionsComponent implements OnInit {
  public movies$: Observable<IMovie[]>;
  public isAddToList: boolean;
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.init();
  }
  private init(): void {
    this.movies$ = this.store.select(selectUserSuggestions);
    this.isAddToList = true;
  }
  public handleAddMovie(movie: IMovie): void {
    this.store.dispatch(addItem({ item: movie }));
  }
}
