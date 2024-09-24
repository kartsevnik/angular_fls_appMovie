// src/app/store/state.ts

import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer } from './reducer';
import { movieDB } from '../models/api-movie-db';

// Определяем глобальное состояние приложения
export interface AppState {
    movies: MoviesState; // Раздел состояния фильмов
}

// Определение состояния фильмов
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

// Начальное состояние фильмов
export const initialState: MoviesState = {
    favoriteMovies: [],
    toWatchMovies: [],
    loading: false,
    error: null,

    trendMovies: [],
    trendCurrentPage: 1,
    trendLoading: false,

    nowPlayingMovies: [],
    nowPlayingCurrentPage: 1,
    nowPlayingLoading: false,

    popularMovies: [],
    popularCurrentPage: 1,
    popularLoading: false,

    topRateMovies: [],
    topRateCurrentPage: 1,
    topRateLoading: false,

    upComingMovies: [],
    upComingCurrentPage: 1,
    upComingLoading: false,
};

// Соединяем все редьюсеры
export const appReducers: ActionReducerMap<AppState> = {
    movies: moviesReducer,
};
