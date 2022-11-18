import { EMovieTypes } from './../interfaces/interface';
import { selectAllTvShows } from './../../state/movies/movies.selectors';
import { IResponse } from '../interfaces/interface';
import { Store } from '@ngrx/store';
import { ENavItems, IAppState, IMovieDetails } from '../interfaces/interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, throwError } from 'rxjs';
import { IMovie, IMovieData } from '../interfaces/interface';
import {
  selectAllMovies,
  selectMoviesAndTvShows,
} from 'src/app/state/movies/movies.selectors';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly KEY: string = '04c35731a5ee918f014970082a0088b1';
  readonly BASE_URL: string = 'https://api.themoviedb.org/3';
  readonly IMAGE_URL: string = 'https://image.tmdb.org/t/p';
  readonly LOCAL_URL: string = 'http://localhost:5000/post';
  readonly POSTER_WIDTH: number = 500;
  readonly BACKGROUND_WIDTH: number = 1280;

  private _moviesPage: number = 1;

  public get moviesPage(): number {
    return this._moviesPage;
  }
  public set moviesPage(value: number) {
    this._moviesPage = value;
  }
  private _tvShowsPage: number = 1;

  public get tvShowsPage(): number {
    return this._tvShowsPage;
  }
  public set tvShowsPage(value: number) {
    this._tvShowsPage = value;
  }

  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  private getImage = (width: number = 500, url: string | null): string =>
    (url && `${this.IMAGE_URL}/w${width}${url}`) || '';

  public getItems = (page: number, type: string): Observable<IMovie[]> =>
    this.http
      .get<IMovieData>(
        `${this.BASE_URL}/discover/${type}?&api_key=${this.KEY}&page=${page}`
      )
      .pipe(
        tap(() =>
          type === EMovieTypes.MOVIE
            ? (this.moviesPage += 1)
            : (this.tvShowsPage += 1)
        ),
        map((items) =>
          items.results.map((item) => ({
            ...item,
            title: item.name || item.title,
            type,
            poster_path: this.getImage(this.POSTER_WIDTH, item.poster_path),
          }))
        )
      );

  public getItemDetails = (url: string): Observable<IMovieDetails> =>
    this.http
      .get<IMovieDetails>(`${this.BASE_URL}${url}?&api_key=${this.KEY}`)
      .pipe(
        map((el) => ({
          ...el,
          poster_path: this.getImage(this.POSTER_WIDTH, el.poster_path),
          backdrop_path: this.getImage(this.BACKGROUND_WIDTH, el.backdrop_path),
        }))
      );

  public tabChange(value: string): Observable<IMovie[]> {
    switch (value) {
      case ENavItems.MOVIES:
        return this.store.select(selectAllMovies);
      case ENavItems.TV_SHOWS:
        return this.store.select(selectAllTvShows);
      default:
        return this.store.select(selectMoviesAndTvShows);
    }
  }

  public addItem = (movie: IMovie): Observable<IResponse> =>
    this.http.post<IResponse>(`${this.LOCAL_URL}/movie`, movie);

  public suggestItem = (movie: IMovie): Observable<IResponse> =>
    this.http.post<IResponse>(`${this.LOCAL_URL}/suggest-someone`, movie);
}
