// Effects (Эффекты): Используются для выполнения побочных эффектов (например, HTTP-запросов) в ответ на действия.
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as MoviesActions from './actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { moviesResponse } from '../models/api-movie-db';
import { Store, select } from '@ngrx/store';
import { AppState } from './state';  // Импорт глобального состояния
import { selectMoviesState } from './selectors';

@Injectable()
export class MoviesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>  // Используем AppState вместо MoviesState
  ) { }

  // Эффект для загрузки фильмов
  // createEffect: Создает эффект, который слушает определенные действия и выполняет побочные эффекты.
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),  // ofType: Фильтрует поток действий, чтобы эффект сработал только для указанных действий.
      mergeMap(() => this.dataService.getMoviesTrending().pipe( //mergeMap: Создает новый поток Observable и подписывается на него. Используется для выполнения HTTP-запросов.
        map((response: moviesResponse) => MoviesActions.loadMoviesSuccess({ movies: response.results })),  // Действие успеха
        catchError(error => of(MoviesActions.loadMoviesFailure({ error: error.message })))  // Действие ошибки
      ))
    )
  );

  // Эффект для загрузки популярных фильмов
  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadPopularMovies),  // Слушаем действие loadPopularMovies
      withLatestFrom(this.store.pipe(select(selectMoviesState))),  // withLatestFrom: Объединяет поток действий с потоком состояния из хранилища. Используется для доступа к состоянию внутри эффекта
      mergeMap(([action, state]) =>
        this.dataService.getMoviesPopular(state.popularCurrentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadPopularMoviesSuccess({ movies: response.results })),  // Действие успеха
          catchError((error) => of(MoviesActions.loadPopularMoviesFailure({ error: error.message })))  // Действие ошибки
        )
      )
    )
  );
}
