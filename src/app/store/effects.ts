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
    private store: Store<AppState>
  ) { }
  //=======================================================================================

  // Эффект для загрузки фильмов
  loadTrendMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadTrendMovies),  // ofType: Фильтрует поток действий, чтобы эффект сработал только для указанных действий.
      mergeMap(() => this.dataService.getMoviesTrending().pipe( //mergeMap: Создает новый поток Observable и подписывается на него. Используется для выполнения HTTP-запросов.
        map((response: moviesResponse) => MoviesActions.loadTrendMoviesSuccess({ movies: response.results })),  // Действие успеха
        catchError(error => of(MoviesActions.loadTrendMoviesFailure({ error: error.message })))  // Действие ошибки
      ))
    )
  );

  //=======================================================================================

  // Эффект для загрузки популярных фильмов
  loadNowPlayingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadNowPlayingMovies),  // Слушаем действие loadNowPlayingMovies
      withLatestFrom(this.store.pipe(select(selectMoviesState))),  // withLatestFrom: Объединяет поток действий с потоком состояния из хранилища. Используется для доступа к состоянию внутри эффекта
      mergeMap(([action, state]) =>
        this.dataService.getMoviesNowPlaying(state.nowPlayingCurrentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadNowPlayingMoviesSuccess({ movies: response.results })),  // Действие успеха
          catchError((error) => of(MoviesActions.loadNowPlayingMoviesFailure({ error: error.message })))  // Действие ошибки
        )
      )
    )
  );

  //=======================================================================================

  // Эффект для загрузки Popular фильмов
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

  //=======================================================================================
  // Эффект для загрузки TopRated фильмов
  loadTopRatedMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadTopRateMovies),
      withLatestFrom(this.store.pipe(select(selectMoviesState))),
      mergeMap(([action, state]) =>
        this.dataService.getMoviesTopRated(state.topRateCurrentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadTopRateMoviesSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadTopRateMoviesFailure({ error: error.message })))
        ))
    )
  )

  //=======================================================================================
  // Эффект для загрузки Up Coming фильмов
  loadUpComingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadUpComingMovies),
      withLatestFrom(this.store.pipe(select(selectMoviesState))),
      mergeMap(([action, state]) =>
        this.dataService.getMoviesUpcoming(state.upComingCurrentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadUpComingSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadUpComingFailure({ error: error.message })))
        ))
    )
  )
}