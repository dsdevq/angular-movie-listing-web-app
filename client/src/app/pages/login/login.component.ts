import { loginUser } from './../../state/user/user.actions';
import { Store } from '@ngrx/store';
import {
  EInputSettingsEmail,
  EInputSettingsPassword,
  IAppState,
} from '../../shared/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

interface ILoginCreds {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public EInputEmail = EInputSettingsEmail;
  public EInputPassword = EInputSettingsPassword;
  public form: FormGroup<ILoginCreds>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  public login() {
    if (this.form.valid) {
      this.store.dispatch(loginUser({ ...this.form.getRawValue() }));
    }
  }
}
