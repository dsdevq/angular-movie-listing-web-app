export interface IAppState {
  moviesState: IMoviesState;
  tvShowsState: ITvShowsState;
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
export interface ITvShowsState {
  tvShows: IMovie[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export enum ENavItems {
  MOVIES = 'Movies',
  TV_SHOWS = 'TV Shows',
  ALL = 'All',
}
export enum EMovieTypes {
  MOVIE = 'movie',
  TV = 'tv',
}

// export interface IMovieDetails {
//   id: number;
//   backdrop_path: string;
//   name?: string;
//   poster_path: string;
//   title?: string;
//   tagline: string;
//   overview: string;
//   vote_average: number;
//   type: string;
//   details: [
//     // Movies
//     { type: string },
//     { release_date: string },
//     { runtime: number },
//     { genres: { id: number; name: string }[] },
//     // Tv Shows
//     { status: string },
//     { first_air_date: string },
//     { last_air_date: string },
//     { number_of_episodes: number },
//     { number_of_seasons: number },
//     { episode_run_time: number[] }
//     //# type, genres
//   ];
// }
export interface IMovieDetails {
  // Different
  name: string;
  title: string;

  release_date?: string;
  first_air_date?: string;

  last_air_date?: string;
  number_of_episodes: number;
  number_of_seasons: number;

  runtime: number;
  episode_run_time: number[];
  status: string;

  // Common
  type: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  tagline: string;
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}
export interface IMovieDetailsState {
  selected: IMovieDetails;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export enum ESelectActions {
  LOAD = '[Select API] loadSelect',
  SUCC = '[Select API] loadSelect Success',
  FAIL = '[Select API] loadSelect Failure',
}
export enum EMoviesActions {
  LOAD = '[Movies API] loadMovies',
  SUCC = '[Movies API] loadMovies Success',
  FAIL = '[Movies API] loadMovies Failure',
  SUGGEST = '[Movies API] suggest',
}

export enum ETvShowsActions {
  LOAD = '[TvShows API] loadTvShows',
  SUCC = '[TvShows API] loadTvShows Success',
  FAIL = '[TvShows API] loadTvShows Failure',
  SUGGEST = '[TvShows API] suggest',
}

export enum EStatuses {
  PEND = 'pending',
  LOAD = 'loading',
  SUCC = 'success',
  FAIL = 'error',
}

// export interface IMovieDetails {
//   id: number;
//   backgrod_path: string | null;
//   poster_path: string | null;
//   title: string;
//   tagline: string | null;
//   overview: string | null;
//   vote_average: number;
//   type: string;
//   release_date: string;
//   runtime: number | null;
//   genres: { id: number; name: string }[];
// }
