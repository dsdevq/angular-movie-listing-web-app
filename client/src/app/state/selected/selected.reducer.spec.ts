import {
  EStatuses,
  IMovieDetails,
  IMovieDetailsState,
} from './../../shared/interfaces/interface';
import * as fromReducer from './selected.reducer';
import {
  loadSelect,
  loadSelectSucc,
  loadSelectFail,
  removeSelect,
} from './selected.actions';

describe('SelectReducer', () => {
  const { initialState } = fromReducer;
  const { selectReducer } = fromReducer;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = selectReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadSelect action', () => {
    const dummyParams = {
      url: '',
      itemType: 'movie',
    };

    const action = loadSelect(dummyParams);
    const state = selectReducer(initialState, action);

    it('Should change status to LOAD', () => {
      expect(state.status).toBe(EStatuses.LOAD);
    });
  });

  describe('loadSelectSucc action', () => {
    const dummyMovieDetails = {} as IMovieDetails;

    const newState = {
      ...initialState,
      selected: dummyMovieDetails,
      status: EStatuses.SUCC,
    } as IMovieDetailsState;
    const action = loadSelectSucc({ selected: dummyMovieDetails });
    const state = selectReducer(initialState, action);

    it('should update the state in an immutable way', () => {
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('set movie details and changes status to SUCC', () => {
      expect(state.selected).toEqual(dummyMovieDetails);
      expect(state.status).toBe(EStatuses.SUCC);
    });
  });

  describe('loadSelectFail action', () => {
    const dummyParams = {
      error: 'Error message',
    };

    const action = loadSelectFail(dummyParams);
    const state = selectReducer(initialState, action);

    it('Should change status to FAIL', () => {
      expect(state.status).toBe(EStatuses.FAIL);
    });
    it('Should save error message', () => {
      expect(state.error).toBeTruthy();
    });
  });

  describe('removeSelect action', () => {
    const action = removeSelect();
    const state = selectReducer(initialState, action);

    it('Should change status to PEND', () => {
      expect(state.status).toBe(EStatuses.PEND);
    });
    it('Should change error to NULL', () => {
      expect(state.error).toBeNull();
    });
    it('Should save selected property as empty object with IMovieDetails interface', () => {
      expect(state.selected).toEqual(initialState.selected);
    });
  });
});
