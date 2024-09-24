// src/app/store/selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, MoviesState } from './state';

// Создаем селектор для состояния фильмов
export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');

//==================FavoriteMovies==================================
export const selectFavoriteMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.favoriteMovies
);

//==================ToWatchMovies==================================
export const selectToWatchMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.toWatchMovies
);

//==================Trend Home==================================
export const selectTrendMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.trendMovies
);

export const selectTrendLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.trendLoading
);

export const selectTrendCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.trendCurrentPage
);

//==================Now playing==================================
export const selectNowPlayingMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.nowPlayingMovies
);

export const selectNowPlayingLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.nowPlayingLoading
);

export const selectNowPlayingCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.nowPlayingCurrentPage
);

//==================POPULAR==================================
export const selectPopularMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.popularMovies
);

export const selectPopularLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.popularLoading
);

export const selectPopularCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.popularCurrentPage
); 

//==================Top Rate==================================
export const selectTopRateMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.topRateMovies
);

export const selectTopRateLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.topRateLoading
);

export const selectTopRateCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.topRateCurrentPage
);

//==================UPCOMING==================================
export const selectUpComingMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.upComingMovies
);

export const selectUpComingLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.upComingLoading
);

export const selectUpComingCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.upComingCurrentPage
);
