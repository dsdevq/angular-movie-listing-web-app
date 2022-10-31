export interface IAppState {
  moviesState: IMoviesState;
  selectedState: IMovieDetailsState;
  // user
}
export interface IMovieData {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_result: number;
}

export interface IMovie {
  id: number;
  type: string;
  overview: string;
  vote_average: number;
  suggested?: boolean;
  title: string;
  name: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  genres: [];
}

export interface IMoviesState {
  movies: IMovie[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export enum EPages {
  MOVIES = 'Movies',
  TV_SHOWS = 'TV Shows',
  SUGGEST = 'Suggest me',
}

export enum ENavItems {
  ALL = 'All',
  MOVIES = 'Movies',
  TV_SHOWS = 'TV Shows',
}
export enum EMovieTypes {
  MOVIE = 'movie',
  TV = 'tv',
}
export interface IMovieDetails {
  // Different
  name: string;
  title: string;

  release_date: string;
  first_air_date: string;

  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;

  runtime: number | null;
  episode_run_time: number[];
  status: string;

  // Common
  type: string;
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  tagline: string | null;
  overview: string | null;
  vote_average: number;
  genres: { id: number; name: string }[];
}
export interface IMovieDetailsState {
  selected: IMovieDetails;
  error: string | null;
  status: EStatuses.PEND | EStatuses.LOAD | EStatuses.FAIL | EStatuses.SUCC;
}

export enum ESelectActions {
  LOAD = '[Select API] loadSelect',
  SUCC = '[Select API] loadSelect Success',
  FAIL = '[Select API] loadSelect Failure',
}

export enum EMoviesTvShowsActions {
  TV_LOAD = '[Movies TvShows API] loadTvShows',
  MOVIE_LOAD = '[Movies TvShows API] loadMovie',
  MOVIE_SUCC = '[Movies TvShows API] loadMovie Success',
  MOVIE_FAIL = '[Movies TvShows API] loadMovie Failure',
  SUGGEST = '[Movies TvShows API] suggest',
}

export enum EStatuses {
  PEND = 'pending',
  LOAD = 'loading',
  SUCC = 'success',
  FAIL = 'error',
}
