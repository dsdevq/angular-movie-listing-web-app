import { IUser } from './../../shared/interfaces/interface';
import { selectUserData } from './../../state/user/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/shared/interfaces/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public username$: Observable<IUser>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.init();
  }
  private init(): void {
    this.username$ = this.store.select(selectUserData);
  }
}
