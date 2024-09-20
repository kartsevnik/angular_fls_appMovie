// Reducers (Редьюсеры): Функции, которые принимают текущее состояние и действие и возвращают новое состояние.

import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { movieDB } from '../models/api-movie-db';

// Определение состояния фильмов
// MoviesState: Интерфейс, описывающий структуру состояния фильмов. 
// Он определяет, какие данные хранятся в состоянии
// (например, массивы фильмов, текущая страница, флаги загрузки).
export interface MoviesState {
    favoriteMovies: movieDB[];
    toWatchMovies: movieDB[];
    loading: boolean;
    error: string | null;

    nowPlayingMovies: movieDB[];
    nowPlayingCurrentPage: number;
    nowPlayingLoading: boolean;

    popularMovies: movieDB[];
    popularCurrentPage: number;
    popularLoading: boolean;


}

// Начальное состояние фильмов
// initialState: Начальное состояние, которое будет установлено в начале работы приложения.
export const initialState: MoviesState = {
    favoriteMovies: [],
    toWatchMovies: [],
    loading: false,
    error: null,

    nowPlayingMovies: [],
    nowPlayingCurrentPage: 1,
    nowPlayingLoading: false,

    popularMovies: [],
    popularCurrentPage: 1,
    popularLoading: false,

};

// Редьюсер для управления состоянием фильмов
// createReducer: Функция, создающая редьюсер.
// Она принимает начальное состояние и множество обработчиков(handlers) для различных действий.

// on: Функция, определяющая, что делать при определенном действии.
// Например, при MoviesActions.loadMovies устанавливается флаг загрузки в true, а ошибка сбрасывается в null.
export const moviesReducer = createReducer(
    initialState,
    //=====================saved-movies===============================

    on(MoviesActions.loadMovies, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(MoviesActions.loadMoviesSuccess, (state, { movies }) => ({
        ...state,
        favoriteMovies: movies.filter(movie => movie.favorite),
        toWatchMovies: movies.filter(movie => movie.toWatch),
        loading: false
    })),
    on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    //==================Now playing==================================

    on(MoviesActions.loadNowPlayingMovies, (state) => ({
        ...state,
        nowPlayingLoading: true,
        error: null
    })),
    on(MoviesActions.loadNowPlayingMoviesSuccess, (state, { movies }) => ({
        ...state,
        nowPlayingMovies: [...state.nowPlayingMovies, ...movies],
        nowPlayingCurrentPage: state.nowPlayingCurrentPage + 1,
        nowPlayingLoading: false
    })),
    on(MoviesActions.loadNowPlayingMoviesFailure, (state, { error }) => ({
        ...state,
        nowPlayingLoading: false,
        error
    })),

    //==================POPULAR==================================

    on(MoviesActions.loadPopularMovies, (state) => ({
        ...state,
        popularLoading: true,
        error: null
    })),
    on(MoviesActions.loadPopularMoviesSuccess, (state, { movies }) => ({
        ...state,
        popularMovies: [...state.popularMovies, ...movies],
        popularCurrentPage: state.popularCurrentPage + 1,
        popularLoading: false
    })),
    on(MoviesActions.loadPopularMoviesFailure, (state, { error }) => ({
        ...state,
        popularLoading: false,
        error
    })),

    //=====================Favorites===============================
    on(MoviesActions.addMovieToFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: [...state.favoriteMovies, movie]
    })),
    on(MoviesActions.removeMovieFromFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: state.favoriteMovies.filter(m => m.id !== movie.id)
    })),
    //=======================Watchlist=============================
    on(MoviesActions.addMovieToWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: [...state.toWatchMovies, movie]
    })),
    on(MoviesActions.removeMovieFromWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: state.toWatchMovies.filter(m => m.id !== movie.id)
    })),
    //====================================================

);
