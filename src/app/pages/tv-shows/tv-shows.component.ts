import { Observable } from 'rxjs';
import { selectAllTvShows } from './../../state/tv-shows/tv-shows.selectors';
import { loadTvShows } from './../../state/tv-shows/tv-shows.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, IMovie } from 'src/app/shared/interface';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  public tvShowsInfo$: Observable<IMovie[]> =
    this.store.select(selectAllTvShows);

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.initTvShows();
  }
  private initTvShows(): void {
    this.store.dispatch(loadTvShows());
  }
  public handleClick(): void {
    this.store.dispatch(loadTvShows());
  }
}
