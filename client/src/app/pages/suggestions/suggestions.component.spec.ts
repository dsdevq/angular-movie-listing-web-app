import { SuggestionsComponent } from './suggestions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IMovie } from './../../shared/interfaces/interface';
import {
  waitForAsync,
  TestBed,
  ComponentFixture,
  getTestBed,
} from '@angular/core/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SuggestionsComponent', () => {
  let component: SuggestionsComponent;
  let fixture: ComponentFixture<SuggestionsComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SuggestionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SuggestionsComponent);
        component = fixture.componentInstance;
        injector = getTestBed();

        store = injector.inject(MockStore);
        store.setState({} as IAppState);
      });
  }));

  it('Should be created', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('handleOnAddMovie', () => {
    it('Should dispatch an action after function call', () => {
      const dummyMovie = {} as IMovie;
      spyOn(store, 'dispatch');
      component.handleAddMovie(dummyMovie);

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
