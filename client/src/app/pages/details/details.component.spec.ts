import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { DetailsComponent } from './details.component';
describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DetailsComponent],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('Should dispatch action on ngDestroy', () => {
      spyOn(store, 'dispatch');
      component.ngOnDestroy();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
  describe('Initialize variables', () => {
    it('Should dispatch an action after function call', () => {
      spyOn(store, 'dispatch');
      expect(component.selectedItem$).toBeUndefined();
      expect(component.status$).toBeUndefined();
      component.ngOnInit();
      expect(component.selectedItem$).toBeDefined();
      expect(component.status$).toBeDefined();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
