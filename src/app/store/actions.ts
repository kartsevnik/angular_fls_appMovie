// Actions (Действия): Объекты, описывающие изменения, которые должны произойти в состоянии.

import { createAction, props } from '@ngrx/store';
import { movieDB } from '../models/api-movie-db';

// Действие для загрузки фильмов
// createAction: Функция, создающая действие. Оно должно быть уникальным и описывать, что произошло.
// props: Описывает данные, которые передаются с действием.
// Например, props<{ movies: movieDB[] }>() указывает, что действие передает массив фильмов.

export const loadMovies = createAction('[Movies] Load Movies');

// Действие для успешной загрузки фильмов с передачей данных
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ movies: movieDB[] }>());

// Действие для ошибки при загрузке фильмов с передачей сообщения об ошибке
export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ error: string }>());

// Действия для добавления и удаления фильмов из избранного
export const addMovieToFavorites = createAction('[Movies] Add Movie To Favorites', props<{ movie: movieDB }>());
export const removeMovieFromFavorites = createAction('[Movies] Remove Movie From Favorites', props<{ movie: movieDB }>());

// Действия для добавления и удаления фильмов из списка просмотра
export const addMovieToWatchlist = createAction('[Movies] Add Movie To Watchlist', props<{ movie: movieDB }>());
export const removeMovieFromWatchlist = createAction('[Movies] Remove Movie From Watchlist', props<{ movie: movieDB }>());

// Действия для загрузки популярных фильмов
export const loadPopularMovies = createAction('[Movies] Load Popular Movies');
export const loadPopularMoviesSuccess = createAction(
    '[Movies] Load Popular Movies Success',
    props<{ movies: movieDB[] }>()
);
export const loadPopularMoviesFailure = createAction(
    '[Movies] Load Popular Movies Failure',
    props<{ error: string }>()
);
