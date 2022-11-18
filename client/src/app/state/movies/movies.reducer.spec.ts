import {
  EStatuses,
  IMovie,
  IMoviesState,
} from './../../shared/interfaces/interface';
import * as fromReducer from './movies.reducer';
import * as MoviesActions from './movies.actions';

describe('MoviesReducer', () => {
  const { initialState } = fromReducer;
  const { moviesReducer } = fromReducer;

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = moviesReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadMoviesTvShows action', () => {
    const dummyParams = {
      page: 1,
      itemType: 'movie',
    };

    const action = MoviesActions.loadMoviesTvShows(dummyParams);
    const state = moviesReducer(initialState, action);

    it('Should change status to LOAD', () => {
      expect(state.status).toBe(EStatuses.LOAD);
    });
  });

  describe('loadMoviesTvSucc action', () => {
    const dummyMovies = [] as IMovie[];

    const newState = {
      ...initialState,
      movies: dummyMovies,
      status: EStatuses.SUCC,
    } as IMoviesState;
    const action = MoviesActions.loadMoviesTvSucc({ movies: dummyMovies });
    const state = moviesReducer(initialState, action);

    it('should update the state in an immutable way', () => {
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState);
    });

    it('set movie details and changes status to SUCC', () => {
      expect(state.movies).toEqual(dummyMovies);
      expect(state.status).toBe(EStatuses.SUCC);
    });
  });

  describe('loadMoviesTvFail action', () => {
    const dummyParams = {
      error: 'Error message',
    };

    const action = MoviesActions.loadMoviesTvFail(dummyParams);
    const state = moviesReducer(initialState, action);

    it('Should change status to FAIL', () => {
      expect(state.status).toBe(EStatuses.FAIL);
    });
    it('Should save error message', () => {
      expect(state.error).toBeTruthy();
    });
  });

  describe('addMovieTvShow action', () => {
    const dummyInitialState = {
      movies: [
        {
          id: 1,
        },
      ] as IMovie[],
    } as IMoviesState;

    const changedMovie = {
      id: 1,
      isAdded: true,
    } as IMovie;
    it('Should change existing movies` field isAdded', () => {
      const action = MoviesActions.addMovieTvShow({ id: 1 });
      const state = moviesReducer(dummyInitialState, action);

      expect(state.movies).toContain(changedMovie);
    });

    it('Shouldn`t do any changes if no movie with such id', () => {
      const action = MoviesActions.addMovieTvShow({ id: 2 });
      const state = moviesReducer(dummyInitialState, action);

      expect(state.movies).toEqual(dummyInitialState.movies);
    });
  });

  describe('suggestMovieTvShow action', () => {
    const dummyInitialState = {
      movies: [
        {
          id: 1,
        },
      ] as IMovie[],
    } as IMoviesState;

    const changedMovie = {
      id: 1,
      isManualSuggestion: true,
    } as IMovie;
    it('Should change existing movies` field isManualSuggestion', () => {
      const action = MoviesActions.suggestMovieTvShow({ id: 1 });
      const state = moviesReducer(dummyInitialState, action);

      expect(state.movies).toContain(changedMovie);
    });

    it('Shouldn`t do any changes if no movie with such id', () => {
      const action = MoviesActions.addMovieTvShow({ id: 2 });
      const state = moviesReducer(dummyInitialState, action);

      expect(state.movies).toEqual(dummyInitialState.movies);
    });
  });
});
