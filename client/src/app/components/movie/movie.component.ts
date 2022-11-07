import { Store } from '@ngrx/store';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() public movieProps: IMovie;
  @Input() public isSuggest: boolean;
  @Input() public isAddToList: boolean;

  @Output() public addMovie = new EventEmitter();
  public link: string;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initMovie();
  }

  private initMovie(): void {
    this.link = `/${this.movieProps.type}/${this.movieProps.id}`;
  }
  public handleClick(movie: IMovie): void {
    this.addMovie.emit(movie);
    // this.store.dispatch(suggestMovieTvShow({ id }));
  }
}
