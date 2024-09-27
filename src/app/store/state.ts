// state.ts
//Файл state.ts определяет глобальное состояние приложения и объединяет все редьюсеры.
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { moviesReducer } from './reducer';
import { movieDB } from '../models/api-movie-db';
import { localStorageSync } from 'ngrx-store-localstorage';
import { Category } from '../models/category';

export interface AppState {
    movies: MoviesState; 
}

export interface MoviesState {
    favoriteMovies: movieDB[];
    toWatchMovies: movieDB[];
    error: string | null;

    trendMovies: movieDB[];
    trendCurrentPage: number;
    trendLoading: boolean;

    nowPlayingMovies: movieDB[];
    nowPlayingCurrentPage: number;
    nowPlayingLoading: boolean;

    popularMovies: movieDB[];
    popularCurrentPage: number;
    popularLoading: boolean;

    topRateMovies: movieDB[];
    topRateCurrentPage: number;
    topRateLoading: boolean;

    upComingMovies: movieDB[];
    upComingCurrentPage: number;
    upComingLoading: boolean;

    categories: Category[],
    selectedCategory: string
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