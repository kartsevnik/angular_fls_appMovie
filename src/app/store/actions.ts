// src/app/store/actions.ts

import { createAction, props } from '@ngrx/store';
import { movieDB } from '../models/api-movie-db';
import { MovieCategory } from '../models/movie-category.enum';

// Действие для установки выбранной категории
export const setSelectedCategory = createAction('[Category] Set Selected Category', props<{ category: MovieCategory }>());

// Обобщенное действие для загрузки фильмов
export const loadGenres = createAction('[Genres] Load genres');
export const loadGenresSuccess = createAction('[Genres] Load genres Success', props<{ genres: any }>());
export const loadGenresFailure = createAction('[Genres] Load genres Failure', props<{ error: string }>());

// Обобщенное действие для загрузки фильмов
export const loadMovies = createAction('[Movies] Load Movies', props<{ category: MovieCategory }>());

// Действия для успешной и неуспешной загрузки фильмов
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ category: MovieCategory; movies: movieDB[] }>());

export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ category: MovieCategory; error: string }>());

// Действия для добавления и удаления фильмов из избранного
export const addMovieToFavorites = createAction('[Movies] Add Movie To Favorites', props<{ movie: movieDB }>());
export const removeMovieFromFavorites = createAction('[Movies] Remove Movie From Favorites', props<{ movie: movieDB }>());

// Действия для добавления и удаления фильмов из списка просмотра
export const addMovieToWatchlist = createAction('[Movies] Add Movie To Watchlist', props<{ movie: movieDB }>());
export const removeMovieFromWatchlist = createAction('[Movies] Remove Movie From Watchlist', props<{ movie: movieDB }>());
