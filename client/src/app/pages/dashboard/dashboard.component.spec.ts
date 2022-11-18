import { IUser } from './../../shared/interfaces/interface';
import { Observable } from 'rxjs';
import { UrlPipe } from './../../shared/pipes/url.pipe';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [DashboardComponent, UrlPipe],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('Init', () => {
    it('Should initialize variables', () => {
      expect(component.user$).toBeUndefined();
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.user$).toBeInstanceOf(Observable<IUser>);
    });
  });
});
