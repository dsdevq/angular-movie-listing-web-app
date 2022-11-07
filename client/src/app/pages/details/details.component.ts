import {
  getSelectStatus,
  selectItemData,
} from '../../state/selected/selected.selectors';
import {
  loadSelect,
  removeSelect,
} from '../../state/selected/selected.actions';
import { Store } from '@ngrx/store';
import {
  IAppState,
  IMovieDetails,
  EStatuses,
  EMovieTypes,
} from '../../shared/interfaces/interface';
import { HttpService } from '../../shared/services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public selectedItem$: Observable<IMovieDetails>;
  public status$: Observable<string>;

  public EStatus = EStatuses;
  public EMovieType = EMovieTypes;

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.initDetails();
  }
  ngOnDestroy(): void {
    this.store.dispatch(removeSelect());
  }

  private initDetails(): void {
    this.selectedItem$ = this.store.select(selectItemData);
    this.status$ = this.store.select(getSelectStatus);
    this.route.params.pipe(take(1)).subscribe((e) => {
      let itemType = e['type'];
      let url = `/${itemType}/${e['id']}`;
      this.store.dispatch(
        loadSelect({
          url,
          itemType,
        })
      );
    });
  }
}
