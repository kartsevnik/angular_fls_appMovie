// Reducers (Редьюсеры): Функции, которые принимают текущее состояние и действие и возвращают новое состояние.
import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { MoviesState } from './state';
import { Category } from '../models/category';

export const categoryList: Category[] = [
    { name: "Home", code: 'Home' },
    { name: "Now playing", code: 'Now playing' },
    { name: "Popular", code: 'Popular' },
    { name: "Top rate", code: 'Top rate' },
    { name: "Upcoming", code: 'Upcoming' },
];

export const initialState: MoviesState = {
    favoriteMovies: [],
    toWatchMovies: [],
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

    categories: categoryList, 
    selectedCategory: 'Home',
};

export const moviesReducer = createReducer(
    initialState,
    on(MoviesActions.setSelectedCategory, (state, { category }) => ({
        ...state,
        //=====================Categories===============================
        selectedCategory: category,
        trendMovies: category === 'Home' ? [] : state.trendMovies,
        nowPlayingMovies: category === 'Now playing' ? [] : state.nowPlayingMovies,
        popularMovies: category === 'Popular' ? [] : state.popularMovies,
        topRateMovies: category === 'Top rate' ? [] : state.topRateMovies,
        upComingMovies: category === 'Upcoming' ? [] : state.upComingMovies,
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

    //==================Trend Home==================================

    on(MoviesActions.loadTrendMovies, (state) => ({
        ...state,
        trendLoading: true,
        error: null
    })),
    on(MoviesActions.loadTrendMoviesSuccess, (state, { movies }) => ({
        ...state,
        trendMovies: [...state.trendMovies, ...movies],
        trendCurrentPage: state.trendCurrentPage + 1,
        trendLoading: false
    })),
    on(MoviesActions.loadTrendMoviesFailure, (state, { error }) => ({
        ...state,
        trendLoading: false,
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

    //==================Top Rate==================================

    on(MoviesActions.loadTopRateMovies, (state) => ({
        ...state,
        topRateLoading: true,
        error: null
    })),
    on(MoviesActions.loadTopRateMoviesSuccess, (state, { movies }) => ({
        ...state,
        topRateMovies: [...state.topRateMovies, ...movies],
        topRateCurrentPage: state.topRateCurrentPage + 1,
        topRateLoading: false
    })),
    on(MoviesActions.loadTopRateMoviesFailure, (state, { error }) => ({
        ...state,
        topRateLoading: false,
        error
    })),

    //==================UPCOMING==================================

    on(MoviesActions.loadUpComingMovies, (state) => ({
        ...state,
        upComingLoading: true,
        error: null
    })),
    on(MoviesActions.loadUpComingSuccess, (state, { movies }) => ({
        ...state,
        upComingMovies: [...state.upComingMovies, ...movies],
        upComingCurrentPage: state.upComingCurrentPage + 1,
        upComingLoading: false
    })),
    on(MoviesActions.loadUpComingFailure, (state, { error }) => ({
        ...state,
        upComingLoading: false,
        error
    })),
    
    //==================RESET PAGE==================================
    // Обработчики действий для сброса currentPage
    on(MoviesActions.resetTrendCurrentPage, (state) => ({
        ...state,
        trendCurrentPage: 1,
        trendMovies: [] // Опционально очищаем список фильмов
    })),
    on(MoviesActions.resetNowPlayingCurrentPage, (state) => ({
        ...state,
        nowPlayingCurrentPage: 1,
        nowPlayingMovies: [] // Опционально очищаем список фильмов
    })),
    on(MoviesActions.resetPopularCurrentPage, (state) => ({
        ...state,
        popularCurrentPage: 1,
        popularMovies: [] // Опционально очищаем список фильмов
    })),
    on(MoviesActions.resetTopRateCurrentPage, (state) => ({
        ...state,
        topRateCurrentPage: 1,
        topRateMovies: [] // Опционально очищаем список фильмов
    })),
    on(MoviesActions.resetUpComingCurrentPage, (state) => ({
        ...state,
        upComingCurrentPage: 1,
        upComingMovies: [] // Опционально очищаем список фильмов
    })),
);
