// state.ts
//Файл state.ts определяет глобальное состояние приложения и объединяет все редьюсеры.
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { moviesReducer } from './reducer';
import { movieDB } from '../models/api-movie-db';
import { localStorageSync } from 'ngrx-store-localstorage';
import { Category } from '../models/category';
import { MovieCategory } from '../models/movie-category.enum';

export interface AppState {
    movies: MoviesState;
}

export interface MoviesState {
    error: string | null;
    categories: Category[];
    selectedCategory: MovieCategory;
    genres: any[];
    favoriteMovies: movieDB[];
    toWatchMovies: movieDB[];
    moviesByCategory: {
        [key in MovieCategory]: {
            movies: movieDB[];
            currentPage: number;
            loading: boolean;
        };
    };
}

export const appReducers: ActionReducerMap<AppState> = {
    movies: moviesReducer,
};
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {
                movies: [
                    'favoriteMovies',
                    'toWatchMovies'
                ]
            }
        ],
        rehydrate: true
    })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];