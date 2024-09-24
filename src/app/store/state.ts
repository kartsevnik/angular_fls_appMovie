// state.ts
//Файл state.ts определяет глобальное состояние приложения и объединяет все редьюсеры.
import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer } from './reducer';
import { movieDB } from '../models/api-movie-db';

// Определяем глобальное состояние приложения
// AppState: Интерфейс, описывающий глобальное состояние приложения. 
// Здесь хранится состояние всех разделов приложения, таких как movies.
export interface AppState {
    movies: MoviesState; // Добавляем раздел состояния фильмов
}

// Определение состояния фильмов
// MoviesState: Интерфейс, описывающий структуру состояния фильмов. 
// Он определяет, какие данные хранятся в состоянии
// (например, массивы фильмов, текущая страница, флаги загрузки).
export interface MoviesState {
    favoriteMovies: movieDB[];
    toWatchMovies: movieDB[];
    loading: boolean;
    error: string | null;

    trendMovies: movieDB[];
    trendCurrentPage: number;
    trendLoading: boolean;

    nowPlayingMovies: movieDB[];
    nowPlayingCurrentPage: number;
    nowPlayingLoading: boolean;

    popularMovies: movieDB[];
    popularCurrentPage: number;
    popularLoading: boolean;

    topRateMovies: movieDB[];
    topRateCurrentPage: number;
    topRateLoading: boolean;

    upComingMovies: movieDB[];
    upComingCurrentPage: number;
    upComingLoading: boolean;
}

// Соединяем все редьюсеры
// appReducers: Карта редьюсеров, которая связывает каждый раздел состояния с соответствующим редьюсером. 
// NgRx Store использует эту карту, чтобы обновлять состояние приложения при каждом действии.
export const appReducers: ActionReducerMap<AppState> = {
    movies: moviesReducer,
};
