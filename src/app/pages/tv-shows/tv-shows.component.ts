import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, IMovie } from 'src/app/shared/interface';
import { loadTvShows } from 'src/app/state/tv-shows/tv-shows.actions';
import { selectAllTvShows } from 'src/app/state/tv-shows/tv-shows.selectors';

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
    this.tvShowsInfo$ = this.store
      .select(selectAllTvShows)
      .pipe(
        tap((tvShows) => !tvShows.length && this.store.dispatch(loadTvShows()))
      );
  }
  public handleClick(): void {
    this.store.dispatch(loadTvShows());
  }
}
