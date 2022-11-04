import { loginUser } from './../../state/user/user.actions';
import { Store } from '@ngrx/store';
import {
  EInputSettingsEmail,
  EInputSettingsPassword,
  IAppState,
} from '../../shared/interfaces/interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public EInputEmail = EInputSettingsEmail;
  public EInputPassword = EInputSettingsPassword;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState> // private authService: AuthService,
  ) // private router: Router
  {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    const { email, password } = this.form.value;
    console.log(email, password);

    if (email && password) {
      this.store.dispatch(loginUser({ email, password }));
      // this.authService.login(email, password).subscribe((e) => {
      //   console.log('LOGIN', e);
      //   console.log('User is logged in');

      //   this.router.navigateByUrl('/');
      // });
    }
  }
}
