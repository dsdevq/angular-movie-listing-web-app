import {
  getSelectStatus,
  selectItemData,
} from '../../state/selected/selected.selectors';
import { loadSelect } from '../../state/selected/selected.actions';
import { Store } from '@ngrx/store';
import {
  IAppState,
  IMovieDetails,
  EStatuses,
  EMovieTypes,
} from '../../shared/interfaces/interface';
import { HttpService } from '../../shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';

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
  public type: string;

  constructor(
    public http: HttpService,
    private routeUrl: Router,
    private routeType: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.initDetails();
  }
  private initDetails(): void {
    this.routeType.params.pipe(take(1)).subscribe((e) => {
      this.type = e['type'];

      this.store.dispatch(
        loadSelect({
          url: this.routeUrl.url,
          itemType: this.type,
        })
      );
    });
  }
}
