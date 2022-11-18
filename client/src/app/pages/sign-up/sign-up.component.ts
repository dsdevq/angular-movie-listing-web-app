import { selectUserRegisterStatus } from './../../state/user/user.selectors';
import { Observable } from 'rxjs';
import {
  EInputSettingsUsername,
  IResponse,
} from './../../shared/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  EInputSettingsEmail,
  EInputSettingsPassword,
  IAppState,
} from 'src/app/shared/interfaces/interface';
import { userRegister } from 'src/app/state/user/user.actions';

interface ISignUp {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public EInputEmail = EInputSettingsEmail;
  public EInputPassword = EInputSettingsPassword;
  public EInputUsername = EInputSettingsUsername;
  public form: FormGroup<ISignUp>;
  public status$: Observable<IResponse | undefined>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.status$ = this.store.select(selectUserRegisterStatus);
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  public signUp() {
    if (this.form.valid) {
      this.store.dispatch(userRegister({ ...this.form.getRawValue() }));
    }
  }
}
