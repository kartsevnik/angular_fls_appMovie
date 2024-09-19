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
export const selectFavoriteMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.favoriteMovies
);

export const selectToWatchMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.toWatchMovies
);

export const selectLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.loading
);

export const selectError = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.error
);

export const selectPopularMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.popularMovies
);

export const selectLoadingPopular = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.loadingPopular
);

export const selectPopularCurrentPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.popularCurrentPage
);
