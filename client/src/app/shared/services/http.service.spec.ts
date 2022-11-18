import { HttpService } from './http.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  IAppState,
  IMovie,
  IMovieData,
  IMovieDetails,
} from '../interfaces/interface';

describe('HttpService', () => {
  let service: HttpService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const initialState: IAppState = {} as IAppState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, provideMockStore({ initialState })],
    });
    injector = getTestBed();
    service = injector.inject(HttpService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getItems method', () => {
    it('Should fetch movies and tv shows and return an Observable<IMovie[]>', () => {
      const dummyMoviesResponse: IMovieData = {
        results: [{} as IMovie, {} as IMovie],
      } as IMovieData;

      const dummyRequestData = {
        type: 'movie',
        page: 1,
      };

      service
        .getItems(dummyRequestData.page, dummyRequestData.type)
        .subscribe((responseMovies) => {
          expect(responseMovies.length).toEqual(
            dummyMoviesResponse.results.length
          );
        });

      const req = httpMock.expectOne(
        `${service.BASE_URL}/discover/${dummyRequestData.type}?&api_key=${service.KEY}&page=${dummyRequestData.page}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyMoviesResponse);
    });
  });

  describe('getItemDetails method', () => {
    it('Should fetch movie and tv shows details and return an Observable<IMovieDetails>', () => {
      const url = '/movie/24';
      const dummyMovieRes = { id: 24 } as IMovieDetails;

      service.getItemDetails(url).subscribe((movie) => {
        expect(movie.id).toBe(24);
      });

      const req = httpMock.expectOne(
        `${service.BASE_URL}${url}?&api_key=${service.KEY}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyMovieRes);
    });
  });

  describe('addItem method', () => {
    it('Should post item and return response as an Observable<IResponse>', () => {
      const movie = {} as IMovie;
      const response = {
        message: 'Test',
      };

      service.addItem(movie).subscribe((movie) => {
        expect(movie.message).toBeInstanceOf(String);
      });

      const req = httpMock.expectOne(`${service.LOCAL_URL}/movie`);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('suggestItem method', () => {
    it('Should post item and return response as an Observable<IResponse>', () => {
      const movie = {} as IMovie;
      const response = {
        message: 'Test',
      };

      service.suggestItem(movie).subscribe((movie) => {
        expect(movie.message).toBeInstanceOf(String);
      });

      const req = httpMock.expectOne(`${service.LOCAL_URL}/suggest-someone`);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });
});
