import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  IAppState,
  IMovie,
  IMovieDetailsState,
} from './../../shared/interfaces/interface';
import { Observable, zip } from 'rxjs';
import { getTestBed, TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { MovieEffects } from './movies.effects';
import { HttpService } from 'src/app/shared/services/http.service';
import { provideMockActions } from '@ngrx/effects/testing';
import * as MoviesActions from './movies.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';

describe('MovieEffects', () => {
  const initialState = {} as IMovieDetailsState;
  const httpService: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    'httpService',
    ['getItems']
  );
  let effects: MovieEffects;
  let injector: TestBed;
  let actions: Observable<Action>;
  let store: MockStore<IAppState>;

  let metadata: EffectsMetadata<MovieEffects>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
        { provide: HttpService, useValue: httpService },
      ],
    });

    injector = getTestBed();
    effects = injector.inject(MovieEffects);
    store = injector.inject(MockStore);
    store.setState({} as IAppState);
    metadata = getEffectsMetadata(effects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  const dummyValues = {
    movies: [] as IMovie[],
    tvShows: [] as IMovie[],
    moviePage: 1,
    tvShowPage: 1,
  };
  describe('loadMoviesAndTvShows$', () => {
    it('should handle loadMoviesAndTvShows and return a loadMoviesTvSucc action', () => {
      const action = MoviesActions.loadMoviesAndTvShows({
        moviePage: dummyValues.moviePage,
        tvShowPage: dummyValues.tvShowPage,
      });
      const outcome = MoviesActions.loadMoviesTvSucc({
        movies: [...dummyValues.movies, ...dummyValues.tvShows],
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const responseMovies = cold('-b|', {
          b: [...dummyValues.movies],
        });
        const responseTvShows = cold('-b|', {
          b: [...dummyValues.tvShows],
        });
        zip([
          httpService.getItems.and.returnValue(responseMovies),
          httpService.getItems.and.returnValue(responseTvShows),
        ]);

        expectObservable(effects.loadMoviesAndTvShows$).toBe('--b', {
          b: outcome,
        });
      });
    });

    it('should register loadMoviesAndTvShows$ that dispatches an action', () => {
      expect(metadata.loadMoviesAndTvShows$?.dispatch).toEqual(true);
    });
  });

  describe('loadMoviesTvShows$', () => {
    it('should handle loadMoviesTvShows and return a loadMoviesTvSucc action', () => {
      const dummyCreds = {
        page: 1,
        itemType: 'movie',
      };
      const action = MoviesActions.loadMoviesTvShows(dummyCreds);
      const outcome = MoviesActions.loadMoviesTvSucc({
        movies: dummyValues.movies,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', {
          b: dummyValues.movies,
        });

        httpService.getItems.and.returnValue(response),
          expectObservable(effects.loadMoviesTvShows$).toBe('--b', {
            b: outcome,
          });
      });
    });

    it('should register loadMoviesTvShows$ that dispatches an action', () => {
      expect(metadata.loadMoviesTvShows$?.dispatch).toEqual(true);
    });
  });
});
