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
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared.module';

interface ILoginCreds {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
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
      password: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  public login() {
    if (this.form.valid) {
      this.store.dispatch(loginUser({ ...this.form.getRawValue() }));
    }
  }
}
