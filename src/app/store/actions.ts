// Actions.ts
import { createAction, props } from '@ngrx/store';
import { movieDB } from '../models/api-movie-db';

export const loadMovies = createAction('[Movies] Load Movies');
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ movies: movieDB[] }>());
export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ error: string }>());

export const addMovieToFavorites = createAction('[Movies] Add Movie To Favorites', props<{ movie: movieDB }>());
export const removeMovieFromFavorites = createAction('[Movies] Remove Movie From Favorites', props<{ movie: movieDB }>());

export const addMovieToWatchlist = createAction('[Movies] Add Movie To Watchlist', props<{ movie: movieDB }>());
export const removeMovieFromWatchlist = createAction('[Movies] Remove Movie From Watchlist', props<{ movie: movieDB }>());

// ==================> Add new actions for popular movies
export const loadPopularMovies = createAction('[Movies] Load Popular Movies');
export const loadPopularMoviesSuccess = createAction(
    '[Movies] Load Popular Movies Success',
    props<{ movies: movieDB[] }>()
);
export const loadPopularMoviesFailure = createAction(
    '[Movies] Load Popular Movies Failure',
    props<{ error: string }>()
);