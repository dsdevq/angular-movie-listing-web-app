import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, IMovie } from 'src/app/shared/interface';
import { selectAllTvShows } from 'src/app/state/movies/movies.selectors';
import { loadTvShows } from 'src/app/state/movies/movies.actions';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  public tvShowsInfo$: Observable<IMovie[]>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initTvShows();
  }

  private initTvShows(): void {
    this.tvShowsInfo$ = this.store.select(selectAllTvShows);
  }
  public handleClick(): void {
    this.store.dispatch(loadTvShows());
  }
}
