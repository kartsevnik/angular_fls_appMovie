import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { movieDB } from '../models/api-movie-db';

// Определение состояния фильмов
export interface MoviesState {
    favoriteMovies: movieDB[];
    toWatchMovies: movieDB[];
    popularMovies: movieDB[];
    popularCurrentPage: number;
    loading: boolean;
    loadingPopular: boolean;
    error: string | null;
}

// Начальное состояние фильмов
export const initialState: MoviesState = {
    favoriteMovies: [],
    toWatchMovies: [],
    popularMovies: [],
    popularCurrentPage: 1,
    loading: false,
    loadingPopular: false,
    error: null,
};

// Редьюсер для управления состоянием фильмов
export const moviesReducer = createReducer(
    initialState,
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
    on(MoviesActions.addMovieToFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: [...state.favoriteMovies, movie]
    })),
    on(MoviesActions.removeMovieFromFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: state.favoriteMovies.filter(m => m.id !== movie.id)
    })),
    on(MoviesActions.addMovieToWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: [...state.toWatchMovies, movie]
    })),
    on(MoviesActions.removeMovieFromWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: state.toWatchMovies.filter(m => m.id !== movie.id)
    })),
    on(MoviesActions.loadPopularMovies, (state) => ({
        ...state,
        loadingPopular: true,
        error: null
    })),
    on(MoviesActions.loadPopularMoviesSuccess, (state, { movies }) => ({
        ...state,
        popularMovies: [...state.popularMovies, ...movies],
        popularCurrentPage: state.popularCurrentPage + 1,
        loadingPopular: false
    })),
    on(MoviesActions.loadPopularMoviesFailure, (state, { error }) => ({
        ...state,
        loadingPopular: false,
        error
    })),
);
