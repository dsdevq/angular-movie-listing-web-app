import { FormBuilder } from '@angular/forms';
import {
  ComponentFixture,
  waitForAsync,
  TestBed,
  getTestBed,
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector: TestBed;

  let store: MockStore<IAppState>;
  let initialState: IAppState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [],
      providers: [provideMockStore({ initialState }), FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  describe('Login method', () => {
    it('Should`t dispatch if no creds', () => {
      component.ngOnInit();
      component.login();
      spyOn(store, 'dispatch');
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    it('Should dispatch action if creds are true', () => {
      spyOn(store, 'dispatch');
      component.ngOnInit();
      component.form.controls['email'].setValue('email@email.com');
      component.form.controls['password'].setValue('123');
      component.login();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
