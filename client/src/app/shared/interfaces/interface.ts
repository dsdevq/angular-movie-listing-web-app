export interface IAppState {
  moviesState: IMoviesState;
  selectedState: IMovieDetailsState;
  user: IUserState;
}

export interface IResponse {
  message: string;
}

export interface IUser {
  email: string;
  expiresIn: string;
  username: string;
  idToken: string;
  roles: string[];
  movies: IMovie[];
  tvShows: IMovie[];
  suggestions: IMovie[];
  manual_suggestions: IMovie[];
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
  isSuggested?: boolean;
  isManualSuggestion?: boolean;
  isAdded?: boolean;
  title: string;
  name: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  genres: [];
  link?: string;
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
  LOGIN = 'Login',
  SIGN_UP = 'Sign Up',
}

export enum EPagesAuthorized {
  DASHBOARD = 'Dashboard',
  SUGGESTIONS = 'Suggestions',
  ADD = 'Add',
  LOGOUT = 'Logout',
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

export enum ESearchInputSettings {
  LABEL = 'Search movies or tv shows',
  PREFIX = 'search',
  PLACEHOLDER = 'ex. Avenger',
}

export enum EInputSettingsEmail {
  LABEL = 'Email',
  PREFIX = 'email',
  TYPE = 'email',
}
export enum EInputSettingsPassword {
  LABEL = 'Password',
  PREFIX = 'lock',
  SUFFIX = 'visibility_off',
  TYPE = 'password',
}
export enum EInputSettingsUsername {
  LABEL = 'Username',
  PREFIX = 'person_outline',
  TYPE = 'text',
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
export interface IUserState {
  user: IUser;
  register?: IResponse;
  error: string | null;
  status: EStatuses.PEND | EStatuses.LOAD | EStatuses.FAIL | EStatuses.SUCC;
}

export enum ESelectActions {
  LOAD = '[Select API] loadSelect',
  SUCC = '[Select API] loadSelect Success',
  FAIL = '[Select API] loadSelect Failure',
  REMOVE = '[Select API] removeSelect',
}

export enum EMoviesTvShowsActions {
  MOVIE_AND_TV_LOAD = '[Movies TvShows API] loadMoviesAndTvShows',
  MOVIE_TV_LOAD = '[Movies TvShows API] loadMoviesTvShows',
  MOVIE_TV_SUCC = '[Movies TvShows API] loadMoviesTvShows Success',
  MOVIE_TV_FAIL = '[Movies TvShows API] loadMoviesTvShows Failure',
  SUGGEST = '[Movies TvShows API] Suggest',
  MANUAL_SUGGEST = '[Movies TvShows API] Manual Suggest',
  ADD = '[Movies TvShows API] Add',
}

export enum EUserActions {
  SIGN_UP = '[User] Sign Up User',
  SIGN_UP_SUCC = '[User] Sign Up User Success',
  SIGN_UP_FAIL = '[User] Sign Up User Failure',
  LOAD = '[User] Login User',
  SUCC = '[User] Login User Success',
  FAIL = '[User] Login User Failure',
  AUTH = '[User] Auth User',
  LOGOUT = '[User] Logout User',

  ADD = '[User] Add Item',
  ADD_SUCC = '[User] Add Item Success',
  ADD_FAIL = '[User] Add Item Failure',

  SUGG = '[User] Suggest Item',
  SUGG_SUCC = '[User] Suggest Item Success',
  SUGG_SUCC_NOT_LOGGED = '[User] Suggest Item Not Logged',
  SUGG_FAIL = '[User] Suggest Item Failure',
}

export enum EStatuses {
  PEND = 'pending',
  LOAD = 'loading',
  SUCC = 'success',
  FAIL = 'error',
}
