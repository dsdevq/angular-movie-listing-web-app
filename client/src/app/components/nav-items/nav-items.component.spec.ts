import { UiDataService } from './../../shared/services/ui-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  getTestBed,
  inject,
  TestBed,
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavItemComponent } from './nav-items.component';

describe('NavItemComponent (class only)', () => {
  let comp: NavItemComponent;

  const uiDataService: jasmine.SpyObj<UiDataService> = jasmine.createSpyObj(
    'uiDataService',
    ['navList$']
  );
  const authService: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['logout']
  );

  let injector: TestBed;
  let initialState: IAppState;
  let store: MockStore<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavItemComponent],
      imports: [HttpClientTestingModule],
      providers: [
        NavItemComponent,
        provideMockStore({ initialState }),

        { provide: UiDataService, useValue: uiDataService },
        { provide: AuthService, useValue: authService },
      ],
    });

    injector = getTestBed();
    comp = injector.inject(NavItemComponent);

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  describe('Services and injections', () => {
    it('should initialize enums when class initializing', () => {
      expect(comp.ENavItem).not.toBeUndefined();
      expect(comp.EPage).not.toBeUndefined();
      expect(comp.EPagesAuthorized).not.toBeUndefined();
    });

    it('should initialize list$ after Angular calls ngOnInit and return undefined before OnInit', () => {
      expect(comp.list$).toBeUndefined();
      comp.ngOnInit();
      expect(comp.list$).toEqual(uiDataService.navList$);
    });

    it('should call authService.logout after logout()', () => {
      comp.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});

describe('NavItemComponent', () => {
  let comp: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;
  let componentUiDataService: UiDataService; //& the actually injected service
  let uiDataService: UiDataService; // & the TestBed injected service
  let componentAuthService: AuthService; //& the actually injected service
  let authService: AuthService; // & the TestBed injected service

  let authServiceStub: Partial<AuthService>;
  let uiDataServiceStub: Partial<UiDataService>;

  let injector: TestBed;
  const initialState: IAppState = {} as IAppState;
  let store: MockStore<IAppState>;

  beforeEach(() => {
    uiDataServiceStub = {};

    authServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [NavItemComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: UiDataService, useValue: uiDataServiceStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    });

    injector = getTestBed();

    fixture = TestBed.createComponent(NavItemComponent);
    comp = fixture.componentInstance;

    //& AuthService && UiDataService actually injected into the component
    uiDataService = fixture.debugElement.injector.get(UiDataService);
    componentUiDataService = uiDataService;

    authService = fixture.debugElement.injector.get(AuthService);
    componentAuthService = authService;

    //& AuthService && UiDataService from the root injector
    uiDataService = TestBed.inject(UiDataService);
    authService = TestBed.inject(AuthService);

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Services and injections', () => {
    it("should inject the component's UserService instance", inject(
      [UiDataService],
      (service: UiDataService) => {
        expect(service).toBe(componentUiDataService);
      }
    ));
    it("should inject the component's AuthService instance", inject(
      [AuthService],
      (service: AuthService) => {
        expect(service).toBe(componentAuthService);
      }
    ));

    it('TestBed and Component UiDataService should be the same', () => {
      expect(uiDataService).toBe(componentUiDataService);
    });
    it('TestBed and Component AuthService should be the same', () => {
      expect(authService).toBe(componentAuthService);
    });
  });
});
