import {
  IUser,
  EPagesAuthorized,
  IAppState,
  EPages,
} from './../../shared/interfaces/interface';
import { selectUserData } from './../../state/user/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user$: Observable<IUser>;
  public EPage = { ...EPagesAuthorized, ...EPages };
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.init();
  }
  private init(): void {
    this.user$ = this.store.select(selectUserData);
  }
}
