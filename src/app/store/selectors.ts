// Selectors (Селекторы): Функции, которые выбирают (извлекают) части состояния из хранилища.

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './reducer';
import { AppState } from './state';  // Импорт глобального состояния

// Создаем селектор для состояния фильмов

// createFeatureSelector: Создает селектор для выбора определенного раздела состояния из глобального состояния.
// Здесь он используется для выбора состояния фильмов MoviesState.
export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');

// Селекторы для отдельных частей состояния фильмов
// createSelector: Создает селектор для извлечения и обработки части состояния.
// Например, selectFavoriteMovies выбирает массив favoriteMovies из состояния MoviesState.


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

// export const selectLoading = createSelector(
//     selectMoviesState,
//     (state: MoviesState) => state.loading
// );

// export const selectError = createSelector(
//     selectMoviesState,
//     (state: MoviesState) => state.error
// );

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