// src/app/store/selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesState } from './state';
import { AppState } from './state';

export const selectMoviesState = createFeatureSelector<AppState, MoviesState>('movies');

export const selectGenres = createSelector(
    selectMoviesState,
    state => state.genres
);

export const selectSelectedCategory = createSelector(
    selectMoviesState,
    state => state.selectedCategory
);

export const selectMoviesByCategory = createSelector(
    selectMoviesState,
    state => state.moviesByCategory
);

export const selectCurrentCategoryMovies = createSelector(
    selectMoviesByCategory,
    selectSelectedCategory,
    (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.movies || []
);

export const selectCurrentCategoryLoading = createSelector(
    selectMoviesByCategory,
    selectSelectedCategory,
    (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.loading || false
);

export const selectCurrentCategoryCurrentPage = createSelector(
    selectMoviesByCategory,
    selectSelectedCategory,
    (moviesByCategory, selectedCategory) => moviesByCategory[selectedCategory]?.currentPage || 1
);


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

//==================Search==================================
export const selectSearchResults = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.searchResults
);

export const selectSearchLoading = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.searchLoading
);

export const selectSearchError = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.searchError
);

export const selectCurrentSearchPage = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.currentSearchPage
)
export const selectCurrentSearchQuery = createSelector(
    selectMoviesState,
    (state: MoviesState) => state.currentSearchQuery
)
