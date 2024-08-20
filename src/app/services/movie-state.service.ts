import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { movieDB } from '../models/api-movie-db';

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {

  private favoriteMovies: movieDB[] = this.dataService.getFavoriteMovies();
  private toWatchMovies: movieDB[] = this.dataService.getToWatchMovies();

  constructor(private dataService: DataService) {}

  getFavoriteMovies(): movieDB[] {
    return this.favoriteMovies;
  }

  getToWatchMovies(): movieDB[] {
    return this.toWatchMovies;
  }

  addMovieToFavorites(movie: movieDB) {
    this.dataService.addMovieToFavorites(movie);
  }

  removeMovieFromFavorites(movie: movieDB) {
    this.dataService.removeMovieFromFavorites(movie);
  }

  addMovieToWatchlist(movie: movieDB) {
    this.dataService.addMovieToWatchlist(movie);
  }

  removeMovieFromWatchlist(movie: movieDB) {
    this.dataService.removeMovieFromWatchlist(movie);
  }
}
