import * as MoviesSelectors from './movies.selectors';
import {
  EMovieTypes,
  IMovie,
  IMoviesState,
} from './../../shared/interfaces/interface';
describe('MoviesSelectors', () => {
  const dummyUserState = {
    movies: [
      {
        id: 1,
        type: EMovieTypes.MOVIE,
      },
      {
        id: 2,
        type: EMovieTypes.TV,
      },
    ] as IMovie[],
  } as IMoviesState;

  describe('selectMoviesAndTvShows selector', () => {
    const result =
      MoviesSelectors.selectMoviesAndTvShows.projector(dummyUserState);

    it('Should return both movies and tvShows as one array', () => {
      expect(result).toEqual(dummyUserState.movies);
    });
  });

  describe('selectAllMovies selector', () => {
    const result = MoviesSelectors.selectAllMovies.projector(dummyUserState);
    it('Should return filtered items with type MOVIE', () => {
      expect(result).toContain(dummyUserState.movies[0]);
    });
    it('Should not contain items with TV type', () => {
      expect(result).not.toContain(dummyUserState.movies[1]);
    });
  });

  describe('selectAllTvShows selector', () => {
    const result = MoviesSelectors.selectAllTvShows.projector(dummyUserState);
    it('Should return filtered items with type MOVIE', () => {
      expect(result).toContain(dummyUserState.movies[1]);
    });
    it('Should not contain items with MOVIE type', () => {
      expect(result).not.toContain(dummyUserState.movies[0]);
    });
  });
});
