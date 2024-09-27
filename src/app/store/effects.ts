// src/app/store/effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as MoviesActions from './actions';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { moviesResponse } from '../models/api-movie-db';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './state';
import {
  selectTrendCurrentPage,
  selectNowPlayingCurrentPage,
  selectPopularCurrentPage,
  selectTopRateCurrentPage,
  selectUpComingCurrentPage
} from './selectors';

@Injectable()
export class MoviesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>
  ) { }

  // Эффект для загрузки Trend Movies
  loadTrendMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadTrendMovies),
      withLatestFrom(this.store.pipe(select(selectTrendCurrentPage))),
      mergeMap(([action, currentPage]) =>
        this.dataService.getMoviesTrending(currentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadTrendMoviesSuccess({ movies: response.results })),
          catchError(error => of(MoviesActions.loadTrendMoviesFailure({ error: error.message })))
        )
      )
    )
  );

  // Эффект для загрузки Now Playing Movies
  loadNowPlayingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadNowPlayingMovies),
      withLatestFrom(this.store.pipe(select(selectNowPlayingCurrentPage))),
      mergeMap(([action, currentPage]) =>
        this.dataService.getMoviesNowPlaying(currentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadNowPlayingMoviesSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadNowPlayingMoviesFailure({ error: error.message })))
        )
      )
    )
  );

  // Эффект для загрузки Popular Movies
  loadPopularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadPopularMovies),
      withLatestFrom(this.store.pipe(select(selectPopularCurrentPage))),
      mergeMap(([action, currentPage]) =>
        this.dataService.getMoviesPopular(currentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadPopularMoviesSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadPopularMoviesFailure({ error: error.message })))
        )
      )
    )
  );

  // Эффект для загрузки Top Rated Movies
  loadTopRatedMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadTopRateMovies),
      withLatestFrom(this.store.pipe(select(selectTopRateCurrentPage))),
      mergeMap(([action, currentPage]) =>
        this.dataService.getMoviesTopRated(currentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadTopRateMoviesSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadTopRateMoviesFailure({ error: error.message })))
        ))
    )
  );

  // Эффект для загрузки Up Coming Movies
  loadUpComingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadUpComingMovies),
      withLatestFrom(this.store.pipe(select(selectUpComingCurrentPage))),
      mergeMap(([action, currentPage]) =>
        this.dataService.getMoviesUpcoming(currentPage).pipe(
          map((response: moviesResponse) => MoviesActions.loadUpComingSuccess({ movies: response.results })),
          catchError((error) => of(MoviesActions.loadUpComingFailure({ error: error.message })))
        ))
    )
  );

  // эффект для автоматической загрузки фильмов при смене категории
  // loadMoviesOnCategoryChange$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MoviesActions.setSelectedCategory),
  //     switchMap(({ category }) => {
  //       switch (category) {
  //         case 'Home':
  //           return of(MoviesActions.loadTrendMovies());
  //         case 'Now playing':
  //           return of(MoviesActions.loadNowPlayingMovies());
  //         case 'Popular':
  //           return of(MoviesActions.loadPopularMovies());
  //         case 'Top rate':
  //           return of(MoviesActions.loadTopRateMovies());
  //         case 'Upcoming':
  //           return of(MoviesActions.loadUpComingMovies());
  //         default:
  //           return of();
  //       }
  //     })
  //   )
  // );

}
