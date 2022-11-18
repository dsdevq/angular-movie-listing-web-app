import { TvShowsComponent } from './tv-shows.component';
import { first } from 'rxjs';
import {
  ComponentFixture,
  getTestBed,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from './../../shared/services/auth.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState, IMovie } from 'src/app/shared/interfaces/interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  const authService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['isLoggedIn']
  );
  const httpService: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    'httpService',
    ['moviesPage']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TvShowsComponent, FilterPipe],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthService, useValue: authService },
        { provide: HttpService, useValue: httpService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TvShowsComponent);
        component = fixture.componentInstance;
        injector = getTestBed();

        store = injector.inject(MockStore);
        store.setState({
          moviesState: {
            movies: [] as IMovie[],
          },
          user: {
            user: {
              tvShows: [{} as IMovie] as IMovie[],
            },
          },
        } as IAppState);
      });
  }));

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Initializing variables', () => {
    it('Should apply selectAllTvShows selector if isLogged false', waitForAsync(() => {
      authService.isLoggedIn.and.returnValue(false);
      component.ngOnInit();
      component.tvShowsInfo$.pipe(first()).subscribe((tvShows) => {
        expect(tvShows.length).toBe(0);
      });
    }));
    it('Should apply selectUserTvShows selector if isLogged true', waitForAsync(() => {
      authService.isLoggedIn.and.returnValue(true);
      component.ngOnInit();
      component.tvShowsInfo$.pipe(first()).subscribe((tvShows) => {
        expect(tvShows.length).toBe(1);
      });
    }));
  });

  describe('handleClick method', () => {
    it('Should dispatch action on click', () => {
      component.ngOnInit();
      spyOn(store, 'dispatch');
      component.handleClick();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
