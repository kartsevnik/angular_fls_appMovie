// src/app/store/actions.ts

import { createAction, props } from '@ngrx/store';
import { movieDB } from '../models/api-movie-db';
import { MovieCategory } from '../models/movie-category.enum';
import { Genre } from '../models/genre';

// Действие для установки выбранной категории
export const setSelectedCategory = createAction('[Category] Set Selected Category', props<{ category: MovieCategory }>());

// Обобщенное действие для загрузки фильмов
export const loadGenres = createAction('[Genres] Load genres');
export const loadGenresSuccess = createAction('[Genres] Load genres Success', props<{ genres: Genre[] }>());
export const loadGenresFailure = createAction('[Genres] Load genres Failure', props<{ error: string }>());

// Обобщенное действие для загрузки фильмов
export const loadMovies = createAction('[Movies] Load Movies', props<{ category: MovieCategory }>());
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ category: MovieCategory; movies: movieDB[] }>());
export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ category: MovieCategory; error: string }>());

// Действия для загрузки, добавления и удаления фильмов из избранного
export const loadFavoritesMovies = createAction('[Movies] Load Favorites Movies', props<{ movies: movieDB[] }>());
export const addMovieToFavorites = createAction('[Movies] Add Movie To Favorites', props<{ movie: movieDB }>());
export const removeMovieFromFavorites = createAction('[Movies] Remove Movie From Favorites', props<{ movie: movieDB }>());

// Действия для загрузки, добавления и удаления фильмов из списка просмотра
export const loadWatchListMovies = createAction('[Movies] Load Watch List Movies', props<{ movies: movieDB[] }>());
export const addMovieToWatchlist = createAction('[Movies] Add Movie To Watchlist', props<{ movie: movieDB }>());
export const removeMovieFromWatchlist = createAction('[Movies] Remove Movie From Watchlist', props<{ movie: movieDB }>());


export const searchMovies = createAction('[Search] Search Movies', props<{ query: string; include_adult: boolean, year: string, page: number }>());
export const searchMoviesSuccess = createAction('[Search] Search Movies Success', props<{ movies: movieDB[] }>());
export const searchMoviesFailure = createAction('[Search] Search Movies Failure', props<{ error: string }>());
export const updateSearchParams = createAction('[Search] Update Search Params', props<{ query: string; include_adult: boolean; year: string, page: number }>());

// src/app/store/actions.ts
export const loadFavoritesMoviesSuccess = createAction('[Movies] Load Favorites Movies Success', props<{ movies: movieDB[] }>());
export const loadFavoritesMoviesFailure = createAction('[Movies] Load Favorites Movies Failure', props<{ error: string }>());
