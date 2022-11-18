import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  IAppState,
  IMovieDetails,
  IMovieDetailsState,
} from './../../shared/interfaces/interface';
import { Observable } from 'rxjs';
import { getTestBed, TestBed } from '@angular/core/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { SelectEffects } from './selected.effects';
import { HttpService } from 'src/app/shared/services/http.service';
import { provideMockActions } from '@ngrx/effects/testing';
import * as SelectActions from './selected.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';

describe('SelectEffects', () => {
  const initialState = {} as IMovieDetailsState;
  const httpService: jasmine.SpyObj<HttpService> = jasmine.createSpyObj(
    'httpService',
    ['getItemDetails']
  );
  let effects: SelectEffects;
  let injector: TestBed;
  let actions: Observable<Action>;
  let store: MockStore<IAppState>;

  let metadata: EffectsMetadata<SelectEffects>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SelectEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
        { provide: HttpService, useValue: httpService },
      ],
    });

    injector = getTestBed();
    effects = injector.inject(SelectEffects);
    store = injector.inject(MockStore);
    store.setState({} as IAppState);
    metadata = getEffectsMetadata(effects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  const dummyValues = {
    select: {
      url: '',
      itemType: 'movie',
    },
    movieDetails: {
      title: '',
      type: 'movie',
    } as IMovieDetails,
  };
  describe('selectItem$', () => {
    it('should handle loadSelect and return a loadSelectSucc action', () => {
      const action = SelectActions.loadSelect(dummyValues.select);
      const outcome = SelectActions.loadSelectSucc({
        selected: dummyValues.movieDetails,
      });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: action });
        const response = cold('-b|', { b: dummyValues.movieDetails });
        httpService.getItemDetails.and.returnValue(response);

        expectObservable(effects.selectItem$).toBe('--b', { b: outcome });
      });
    });
    it('should register selectItem$ that dispatches an action', () => {
      expect(metadata.selectItem$?.dispatch).toEqual(true);
    });
  });
});
