import { Store } from '@ngrx/store';
import { ENavItems, IAppState, IMovieDetails } from '../interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { IMovie, IMovieData } from '../interface';
import { selectAllMovies } from '../../state/movies/movies.selectors';
import { selectAllTvShows } from '../../state/tv-shows/tv-shows.selectors';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private KEY: string = '04c35731a5ee918f014970082a0088b1';
  private BASE_URL: string = 'https://api.themoviedb.org/3';
  private IMAGE_URL: string = 'https://image.tmdb.org/t/p';
  private POSTER_WIDTH: number = 500;
  private BACKGROUND_WIDTH: number = 1280;
  private ENavItem = ENavItems;

  // !!!!!!
  private moviePage = 1;
  private tvShowsPage = 1;

  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  private getImage = (width: number = 500, url: string) =>
    `${this.IMAGE_URL}/w${width}${url}`;

  public getMovies = (): Observable<IMovie[]> =>
    this.http
      .get<IMovieData>(
        `${this.BASE_URL}/discover/movie?&api_key=${this.KEY}&page=${this.moviePage}`
      )
      .pipe(
        tap(() => {
          this.moviePage += 1;
        }),
        map((result) =>
          result.results.map((movie) => ({
            ...movie,
            type: 'movie',
            poster_path: this.getImage(this.POSTER_WIDTH, movie.poster_path),
          }))
        )
      );

  public getTvShows = (): Observable<IMovie[]> =>
    this.http
      .get<IMovieData>(
        `${this.BASE_URL}/tv/top_rated?&api_key=${this.KEY}&page=${this.tvShowsPage}`
      )
      .pipe(
        tap(() => {
          this.tvShowsPage += 1;
        }),
        map((result) =>
          result.results.map((tv) => ({
            ...tv,
            title: tv.name,
            type: 'tv',
            poster_path: this.getImage(this.POSTER_WIDTH, tv.poster_path),
          }))
        )
      );

  public getItem = (url: string): Observable<IMovieDetails> =>
    this.http
      .get<IMovieDetails>(`${this.BASE_URL}${url}?&api_key=${this.KEY}`)
      .pipe(
        map((el) => ({
          ...el,
          poster_path: this.getImage(this.POSTER_WIDTH, el.poster_path),
          backdrop_path: this.getImage(this.BACKGROUND_WIDTH, el.backdrop_path),
        }))
      );

  // !!!
  public tabChange(value: string): Observable<IMovie[]> {
    if (value === this.ENavItem.MOVIES) {
      return this.store.select(selectAllMovies);
    }
    if (value === this.ENavItem.TV_SHOWS) {
      return this.store.select(selectAllTvShows);
    }
    return this.store
      .select(selectAllMovies)
      .pipe(
        switchMap((movies) =>
          this.store
            .select(selectAllTvShows)
            .pipe(map((tvShows) => [...movies, ...tvShows]))
        )
      );
  }
}
