import {
  getSelectStatus,
  selectItemData,
} from './../../state/selected/selected.selectors';
import { loadSelect } from './../../state/selected/selected.actions';
import { Store } from '@ngrx/store';
import {
  IAppState,
  IMovieDetails,
  EStatuses,
  EMovieTypes,
} from './../../shared/interface';
import { HttpService } from '../../shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public selectedItem$: Observable<IMovieDetails> =
    this.store.select(selectItemData);

  public status$: Observable<string> = this.store.select(getSelectStatus);
  public EStatus = EStatuses;
  public EMovieType = EMovieTypes;

  constructor(
    public http: HttpService,
    private route: Router,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.initDetails();
  }
  private initDetails(): void {
    this.store.dispatch(
      loadSelect({
        url: this.route.url,
        // !!!!!!!!!
        itemType: this.route.url.split('/')[1],
      })
    );
  }
}
