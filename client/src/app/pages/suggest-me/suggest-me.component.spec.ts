import { SuggestMeComponent } from './suggest-me.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IMovie } from './../../shared/interfaces/interface';
import { FormBuilder } from '@angular/forms';
import {
  waitForAsync,
  TestBed,
  ComponentFixture,
  getTestBed,
} from '@angular/core/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SuggestMeComponent', () => {
  let component: SuggestMeComponent;
  let fixture: ComponentFixture<SuggestMeComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SuggestMeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState }), FormBuilder],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SuggestMeComponent);
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

  describe('FormGroup', () => {
    it('Should apply searchInput.value changes to component.value after calling handleSubmit', () => {
      let testValue = '123';
      component.ngOnInit();
      component.searchInput.controls['value'].setValue(testValue);
      component.handleSubmit();
      expect(component.value).toBe(testValue);
    });
  });
  describe('handleOnAddMovie', () => {
    it('Should dispatch an action after function call', () => {
      const dummyMovie = {} as IMovie;
      spyOn(store, 'dispatch');
      component.handleOnSuggestMovie(dummyMovie);

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
