import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './reducer';
import { AppState } from './state';  // Импорт глобального состояния

export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');

export const selectFavoriteMovies = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.favoriteMovies
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
