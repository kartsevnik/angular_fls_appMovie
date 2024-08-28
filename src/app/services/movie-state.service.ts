
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../store/actions';
import { movieDB } from '../models/api-movie-db';

@Injectable({
  providedIn: 'root' // Регистрируем сервис как провайдер в корневом модуле
})
export class MovieStateService {

  // private favoriteMovies: movieDB[] = this.dataService.getFavoriteMovies();
  // private toWatchMovies: movieDB[] = this.dataService.getToWatchMovies();

  constructor(private dataService: DataService, private store: Store) {}

  // getFavoriteMovies(): movieDB[] {
  //   return this.favoriteMovies;
  // }

  // getToWatchMovies(): movieDB[] {
  //   return this.toWatchMovies;
  // }

  addMovieToFavorites(movie: movieDB) {
    // this.dataService.addMovieToFavorites(movie);
    this.store.dispatch(MoviesActions.addMovieToFavorites({ movie }));
  }

  removeMovieFromFavorites(movie: movieDB) {
    // this.dataService.removeMovieFromFavorites(movie);
    this.store.dispatch(MoviesActions.removeMovieFromFavorites({ movie }));
  }

  addMovieToWatchlist(movie: movieDB) {
    // this.dataService.addMovieToWatchlist(movie);
    this.store.dispatch(MoviesActions.addMovieToWatchlist({ movie }));
  }

  removeMovieFromWatchlist(movie: movieDB) {
    // this.dataService.removeMovieFromWatchlist(movie);
    this.store.dispatch(MoviesActions.removeMovieFromWatchlist({ movie }));
  }
}