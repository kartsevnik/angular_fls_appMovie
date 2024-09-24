import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Store } from '@ngrx/store';
import { AppState } from "../store/state";
import * as MoviesActions from '../store/actions';
import { selectTrendMovies, selectNowPlayingMovies, selectPopularMovies, selectTopRateMovies, selectUpComingMovies } from '../store/selectors';
import { filter, take, catchError } from 'rxjs/operators';
import { movieDB } from "../models/api-movie-db";

@Injectable({
    providedIn: 'root'
})
export class MoviesResolver {
    constructor(private store: Store<AppState>, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<movieDB[]> {
        const path = route.routeConfig?.path;
        window.scrollTo(0, 0);
        switch (path) {
            case 'home':
                this.store.dispatch(MoviesActions.loadTrendMovies());
                return this.store.select(selectTrendMovies).pipe(
                    filter(movies => !!movies && movies.length > 0),
                    take(1),
                    catchError((error) => {
                        console.error('Ошибка при загрузке Trend фильмов', error);
                        this.router.navigate(['/error']);
                        return of([]);
                    })
                );
            case 'now-playing':
                this.store.dispatch(MoviesActions.loadNowPlayingMovies());
                return this.store.select(selectNowPlayingMovies).pipe(
                    filter(movies => !!movies && movies.length > 0),
                    take(1),
                    catchError((error) => {
                        console.error('Ошибка при загрузке Now Playing фильмов', error);
                        this.router.navigate(['/error']);
                        return of([]);
                    })
                );
            case 'popular':
                this.store.dispatch(MoviesActions.loadPopularMovies());
                return this.store.select(selectPopularMovies).pipe(
                    filter(movies => !!movies && movies.length > 0),
                    take(1),
                    catchError((error) => {
                        console.error('Ошибка при загрузке Popular фильмов', error);
                        this.router.navigate(['/error']);
                        return of([]);
                    })
                );
            case 'top-rate':
                this.store.dispatch(MoviesActions.loadTopRateMovies());
                return this.store.select(selectTopRateMovies).pipe(
                    filter(movies => !!movies && movies.length > 0),
                    take(1),
                    catchError((error) => {
                        console.error('Ошибка при загрузке top-rate фильмов', error);
                        this.router.navigate(['/error']);
                        return of([]);
                    })
                );
            case 'upcoming':
                this.store.dispatch(MoviesActions.loadUpComingMovies());
                return this.store.select(selectUpComingMovies).pipe(
                    filter(movies => !!movies && movies.length > 0),
                    take(1),
                    catchError((error) => {
                        console.error('Ошибка при загрузке upcoming фильмов', error);
                        this.router.navigate(['/error']);
                        return of([]);
                    })
                );
            // Добавьте другие кейсы для других маршрутов
            default:
                return of([]);
        }
    }
}
