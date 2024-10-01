import { createReducer, on } from '@ngrx/store';
import * as MoviesActions from './actions';
import { MoviesState } from './state';
import { categoryList } from '../models/category';
import { MovieCategory } from '../models/movie-category.enum';

export const initialState: MoviesState = {
    error: null,
    categories: categoryList,
    selectedCategory: MovieCategory.Home,
    genres: [],
    favoriteMovies: [],
    toWatchMovies: [],

    moviesByCategory: {
        [MovieCategory.Home]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.NowPlaying]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.Popular]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.TopRate]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.Upcoming]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.Favorites]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.WatchList]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
        [MovieCategory.Search]: {
            movies: [],
            currentPage: 1,
            loading: false,
        },
    },
    searchResults: [], //Массив результатов поиска.
    searchLoading: false, //Флаг загрузки для состояния поиска.
    searchError: null, //Сообщение об ошибке при поиске
    currentSearchPage: 1, //Текущий номер страницы поиска.
    currentSearchQuery: '', //Текущий поисковый запрос.
};

export const moviesReducer = createReducer(
    initialState,

    // Обработка загрузки категорий
    on(MoviesActions.loadGenresSuccess, (state, { genres }) => ({
        ...state,
        genres: [...genres] // Сохраняем загруженные жанры в состоянии
    })),


    // Что происходит в setSelectedCategory:
    // Обновляется свойство selectedCategory в состоянии на значение MovieCategory.Home.
    // Сбрасывается список фильмов и текущая страница для категории Home:
    // movies устанавливается как пустой массив [].
    // currentPage устанавливается на 1.
    on(MoviesActions.setSelectedCategory, (state, { category }) => ({
        ...state,
        selectedCategory: category,
        moviesByCategory: {
            ...state.moviesByCategory,
            [category]: {
                ...state.moviesByCategory[category],
                movies: [],
                currentPage: 1,
            },
        },
    })),

    // Обработка загрузки фильмов
    on(MoviesActions.loadMovies, (state, { category }) => ({
        ...state,
        moviesByCategory: {
            ...state.moviesByCategory,
            [category]: {
                ...state.moviesByCategory[category],
                loading: true,
            },
        },
    })),

    // Обработка успешной загрузки фильмов
    on(MoviesActions.loadMoviesSuccess, (state, { category, movies }) => ({
        ...state,
        moviesByCategory: {
            ...state.moviesByCategory,
            [category]: {
                movies: [...state.moviesByCategory[category].movies, ...movies],
                currentPage: state.moviesByCategory[category].currentPage + 1,
                loading: false,
            },
        },
    })),

    // Обработка ошибки загрузки фильмов
    on(MoviesActions.loadMoviesFailure, (state, { category, error }) => ({
        ...state,
        error,
        moviesByCategory: {
            ...state.moviesByCategory,
            [category]: {
                ...state.moviesByCategory[category],
                loading: false,
            },
        },
    })),
    //=======================Favorites=============================
    on(MoviesActions.loadFavoritesMovies, (state, { movies }) => ({
        ...state,
        favoriteMovies: movies,
    })),
    on(MoviesActions.addMovieToFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: [...state.favoriteMovies, movie]
    })),
    on(MoviesActions.removeMovieFromFavorites, (state, { movie }) => ({
        ...state,
        favoriteMovies: state.favoriteMovies.filter(m => m.id !== movie.id)
    })),

    //=======================Watchlist=============================
    on(MoviesActions.loadWatchListMovies, (state, { movies }) => ({
        ...state,
        toWatchMovies: movies,
    })),
    on(MoviesActions.addMovieToWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: [...state.toWatchMovies, movie]
    })),
    on(MoviesActions.removeMovieFromWatchlist, (state, { movie }) => ({
        ...state,
        toWatchMovies: state.toWatchMovies.filter(m => m.id !== movie.id)
    })),

    //=======================Search=============================
    // Обработка начала поиска
    on(MoviesActions.searchMovies, (state, { query, page }) => {
        console.log('Reducer - searchMovies:', query);
        return {
            ...state,
            searchLoading: true,
            searchError: null,
            currentSearchQuery: query,
            currentSearchPage: page,
            searchResults: page === 1 ? [] : state.searchResults,
        };
    }),


    // Обработка успешного поиска
    on(MoviesActions.searchMoviesSuccess, (state, { movies }) => ({
        ...state,
        searchLoading: false,
        searchResults: [...state.searchResults, ...movies],
    })),

    // Обработка ошибки поиска
    on(MoviesActions.searchMoviesFailure, (state, { error }) => ({
        ...state,
        searchLoading: false,
        searchError: error,
    })),

    on(MoviesActions.updateSearchQuery, (state, { query }) => ({
        ...state,
        currentSearchQuery: query
    })),
);
