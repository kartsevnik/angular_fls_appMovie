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

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      mergeMap(() => this.dataService.getMoviesTrending().pipe(
        map((response: moviesResponse) => MoviesActions.loadMoviesSuccess({ movies: response.results })),
        catchError(error => of(MoviesActions.loadMoviesFailure({ error: error.message })))
      ))
    )
  );

  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadPopularMovies),
      withLatestFrom(this.store.pipe(select(selectMoviesState))),
      mergeMap(([action, state]) =>
        this.dataService.getMoviesPopular(state.popularCurrentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadPopularMoviesSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadPopularMoviesFailure({ error: error.message })))
        )
      )
    )
  );
}
