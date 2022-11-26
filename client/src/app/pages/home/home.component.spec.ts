import { loadMoviesTvShows } from './../../state/movies/movies.actions';
import { loadMoviesAndTvShows } from 'src/app/state/movies/movies.actions';
import { first } from 'rxjs';
import { selectAllMovies } from './../../state/movies/movies.selectors';
import { IMovie, EMovieTypes } from './../../shared/interfaces/interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HttpService } from './../../shared/services/http.service';
import { FilterPipe } from './../../shared/pipes/filter.pipe';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { UiDataService } from 'src/app/shared/services/ui-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  const uiDataService: jasmine.SpyObj<UiDataService> = jasmine.createSpyObj(
    'uiDataService',
    ['inputField', 'newValueChanges']
  );
  const httpService: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    'httpService',
    ['tabChange', 'moviesPage', 'tvShowsPage']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HomeComponent, FilterPipe],
      providers: [
        provideMockStore({ initialState }),
        FormBuilder,
        { provide: UiDataService, useValue: uiDataService },
        { provide: HttpService, useValue: httpService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({
      moviesState: {
        movies: [
          { type: EMovieTypes.MOVIE } as IMovie,
          { type: EMovieTypes.MOVIE } as IMovie,
          { type: EMovieTypes.TV } as IMovie,
        ] as IMovie[],
      },
    } as IAppState);
  });

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('handleTabChange', () => {
    it('Should change Observable on tabChange', () => {
      const dummyFormControl = new FormGroup({
        value: new FormControl(''),
      });
      const dummyTab = {
        tab: {
          textLabel: 'Movies',
        },
      } as MatTabChangeEvent;

      uiDataService.inputField.and.returnValue(dummyFormControl);
      component.ngOnInit();

      httpService.tabChange.and.returnValue(store.select(selectAllMovies));
      fixture.detectChanges();
      component.handleTabChange(dummyTab);
      fixture.detectChanges();
      component.movies$.pipe(first()).subscribe((movies) => {
        expect(movies.length).toBe(2);
      });
    });
  });
  describe('handleClick method', () => {
    it('Should dispatch loadMoviesAndTvShows if there is no selectedTab', () => {
      spyOn(store, 'dispatch');
      component.handleClick();
      expect(store.dispatch).toHaveBeenCalledWith(
        loadMoviesAndTvShows({
          moviePage: httpService.moviesPage,
          tvShowPage: httpService.tvShowsPage,
        })
      );
    });
    it('Should dispatch loadMoviesTvShows if selectedTab is MOVIES', () => {
      spyOn(store, 'dispatch');
      const dummyFormControl = new FormGroup({
        value: new FormControl(''),
      });
      const dummyTab = {
        tab: {
          textLabel: 'Movies',
        },
      } as MatTabChangeEvent;

      uiDataService.inputField.and.returnValue(dummyFormControl);
      component.ngOnInit();

      httpService.tabChange.and.returnValue(store.select(selectAllMovies));
      fixture.detectChanges();
      component.handleTabChange(dummyTab);
      fixture.detectChanges();
      component.handleClick();

      expect(store.dispatch).toHaveBeenCalledWith(
        loadMoviesTvShows({
          itemType: EMovieTypes.MOVIE,
          page: httpService.moviesPage,
        })
      );
    });
    it('Should dispatch loadMoviesTvShows if selectedTab is TV', () => {
      spyOn(store, 'dispatch');
      const dummyFormControl = new FormGroup({
        value: new FormControl(''),
      });
      const dummyTab = {
        tab: {
          textLabel: 'TV Shows',
        },
      } as MatTabChangeEvent;

      uiDataService.inputField.and.returnValue(dummyFormControl);
      component.ngOnInit();

      httpService.tabChange.and.returnValue(store.select(selectAllMovies));
      fixture.detectChanges();
      component.handleTabChange(dummyTab);
      fixture.detectChanges();
      component.handleClick();

      expect(store.dispatch).toHaveBeenCalledWith(
        loadMoviesTvShows({
          itemType: EMovieTypes.TV,
          page: httpService.tvShowsPage,
        })
      );
    });
  });
});
