// state.ts
import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer, MoviesState } from './reducer';

// Определяем глобальное состояние приложения
export interface AppState {
    movies: MoviesState; // Добавляем раздел состояния фильмов
}

// Соединяем все редьюсеры
export const appReducers: ActionReducerMap<AppState> = {
    movies: moviesReducer,
};
