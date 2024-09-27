import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MoviesActions from './actions';
import { switchMap, withLatestFrom, map, catchError } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state';
import { MovieCategory } from '../models/movie-category.enum';
import { selectGenres } from './selectors';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>
  ) { }
  // Эффект для автоматической загрузки фильмов при смене категории
  loadMoviesOnCategoryChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.setSelectedCategory),
      map(action => MoviesActions.loadMovies({ category: action.category }))
    )
  );

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadGenres), // Перехватываем действие `loadGenres`
      withLatestFrom(this.store.select(selectGenres)), // Проверяем, есть ли жанры в Store
      switchMap(([action, genres]) => {
        // Если жанры уже загружены, не отправляем повторный запрос
        if (genres.length > 0) {
          return of(); // Прерываем эффект
        }

        // Если жанры не загружены, отправляем запрос к API
        return this.dataService.getAllGenres().pipe(
          map(response => {
            console.log('API Response:', response); // Для отладки
            return MoviesActions.loadGenresSuccess({ genres: response.genres });
          }),
          catchError(error => {
            console.error('Error loading genres:', error); // Для отладки
            return of(MoviesActions.loadGenresFailure({ error: error.message }));
          })
        );
      })
    )
  );



  // Обобщенный эффект для загрузки фильмов
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      withLatestFrom(this.store.select(state => state.movies)),
      switchMap(([action, moviesState]) => {
        const { category } = action;
        const currentPage = moviesState.moviesByCategory[category].currentPage;

        let dataServiceCall;
        switch (category) {
          case MovieCategory.Home:
            dataServiceCall = this.dataService.getMoviesTrending(currentPage);
            break;
          case MovieCategory.NowPlaying:
            dataServiceCall = this.dataService.getMoviesNowPlaying(currentPage);
            break;
          case MovieCategory.Popular:
            dataServiceCall = this.dataService.getMoviesPopular(currentPage);
            break;
          case MovieCategory.TopRate:
            dataServiceCall = this.dataService.getMoviesTopRated(currentPage);
            break;
          case MovieCategory.Upcoming:
            dataServiceCall = this.dataService.getMoviesUpcoming(currentPage);
            break;
          default:
            return of();
        }

        return dataServiceCall.pipe(
          map(response => MoviesActions.loadMoviesSuccess({ category, movies: response.results })),
          catchError(error => of(MoviesActions.loadMoviesFailure({ category, error: error.message })))
        );
      })
    )
  );



}
