import { selectUserStatus } from './../../state/user/user.selectors';
import { Observable, map, tap } from 'rxjs';
import { EStatuses, IMovie } from './../../shared/interfaces/interface';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  EInputSettingsEmail,
  EInputSettingsPassword,
  IAppState,
} from 'src/app/shared/interfaces/interface';
import { suggestItem } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss'],
})
export class DialogPopupComponent<T> {
  public form = this.fb.group({
    title: ['', Validators.required],
    link: [''],
  });
  public EInputEmail = EInputSettingsEmail;
  public EInputPassword = EInputSettingsPassword;
  public canClose$: Observable<boolean>;

  constructor(
    private fb: NonNullableFormBuilder,
    private store: Store<IAppState>
  ) {}
  ngOnInit(): void {
    this.canClose$ = this.store.select(selectUserStatus).pipe(
      tap(console.log),
      map((status) => status === EStatuses.SUCC)
    );
  }

  public handleSubmit(): void {
    if (this.form.valid) {
      let item = this.form.getRawValue();
      this.store.dispatch(suggestItem({ item: item as IMovie }));
    }
  }
}
