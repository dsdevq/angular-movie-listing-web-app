import { first } from 'rxjs';
import { MoviesComponent } from './movies.component';
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
describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [MoviesComponent, FilterPipe],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthService, useValue: authService },
        { provide: HttpService, useValue: httpService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({
      moviesState: {
        movies: [] as IMovie[],
      },
      user: {
        user: {
          movies: [{} as IMovie] as IMovie[],
        },
      },
    } as IAppState);
  });

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Initializing variables', () => {
    it('Should apply selectAllMovies selector if isLogged false', waitForAsync(() => {
      authService.isLoggedIn.and.returnValue(false);
      component.ngOnInit();
      component.moviesInfo$.pipe(first()).subscribe((movies) => {
        expect(movies.length).toBe(0);
      });
    }));
    it('Should apply selectUserMovies selector if isLogged true', waitForAsync(() => {
      authService.isLoggedIn.and.returnValue(true);
      component.ngOnInit();
      component.moviesInfo$.pipe(first()).subscribe((movies) => {
        expect(movies.length).toBe(1);
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
