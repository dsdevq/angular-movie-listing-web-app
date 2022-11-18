import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IMovie } from './../../shared/interfaces/interface';
import { FormBuilder } from '@angular/forms';
import { AddComponent } from './add.component';
import { TestBed, ComponentFixture, getTestBed } from '@angular/core/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let store: MockStore<IAppState>;
  let injector: TestBed;
  let initialState: IAppState;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AddComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState }), FormBuilder],
    }).compileComponents();
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    injector = getTestBed();

    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

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
      component.handleOnAddMovie(dummyMovie);

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
