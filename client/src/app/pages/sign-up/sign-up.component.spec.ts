import { SignUpComponent } from './sign-up.component';

import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from 'src/app/shared/interfaces/interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let injector: TestBed;

  let store: MockStore<IAppState>;
  let initialState: IAppState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState }), FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    store = injector.inject(MockStore);
    store.setState({} as IAppState);
  });

  describe('SignUp method', () => {
    it('Should`t dispatch if no creds', () => {
      component.ngOnInit();
      component.signUp();
      spyOn(store, 'dispatch');
      expect(store.dispatch).not.toHaveBeenCalled();
    });
    it('Should dispatch action if creds are true', () => {
      spyOn(store, 'dispatch');
      component.ngOnInit();
      component.form.controls['username'].setValue('username');
      component.form.controls['email'].setValue('email@email.com');
      component.form.controls['password'].setValue('123');
      component.signUp();
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
