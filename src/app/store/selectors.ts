// Selectors (Селекторы): Функции, которые выбирают (извлекают) части состояния из хранилища.

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './state';
import { AppState } from './state';  // Импорт глобального состояния


// Создаем селектор для состояния фильмов
// createFeatureSelector: Создает селектор для выбора определенного раздела состояния из глобального состояния.
// Здесь он используется для выбора состояния фильмов MoviesState.
export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');



// Селекторы для отдельных частей состояния фильмов
//==================FavoriteMovies==================================

// createSelector: Создает селектор для извлечения и обработки части состояния.
// Например, selectFavoriteMovies выбирает массив favoriteMovies из состояния MoviesState.

export const selectFavoriteMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.favoriteMovies
);

//==================ToWatchMovies==================================

export const selectToWatchMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.toWatchMovies
);

//==================TREND home==================================
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

//==================UpComing==================================
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