// state.ts
//Файл state.ts определяет глобальное состояние приложения и объединяет все редьюсеры.
import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer, MoviesState } from './reducer';

// Определяем глобальное состояние приложения
// AppState: Интерфейс, описывающий глобальное состояние приложения. 
// Здесь хранится состояние всех разделов приложения, таких как movies.
export interface AppState {
    movies: MoviesState; // Добавляем раздел состояния фильмов
}

// Соединяем все редьюсеры
// appReducers: Карта редьюсеров, которая связывает каждый раздел состояния с соответствующим редьюсером. 
// NgRx Store использует эту карту, чтобы обновлять состояние приложения при каждом действии.
export const appReducers: ActionReducerMap<AppState> = {
    movies: moviesReducer,
};
