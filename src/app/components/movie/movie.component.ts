import { suggestMovieTvShow } from './../../state/movies/movies.actions';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() public movieProps: IMovie;
  @Input() public isSuggest: boolean;
  public link: string;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initMovie();
  }

  private initMovie(): void {
    this.link = `/${this.movieProps.type}/${this.movieProps.id}`;
  }
  public handleClick(id: number): void {
    this.store.dispatch(suggestMovieTvShow({ id }));
  }
}
