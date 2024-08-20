// MovieStateService:
// отвечает за управление состоянием favoriteMovies и toWatchMovies,
// взаимодействует с DataService для выполнения операций и обновления локальных данных
import { Injectable } from '@angular/core';
import { movie } from '../models/movie';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {

  // Локальные массивы для хранения состояния избранных фильмов и фильмов для просмотра
  private favoriteMovies: movie[] = this.dataService.getFavoriteMovies();
  private toWatchMovies: movie[] = this.dataService.getToWatchMovies();

  constructor(private dataService: DataService) { }

  // Получаем локальный список избранных фильмов
  getFavoriteMovies(): movie[] {
    return this.favoriteMovies;
  }

  // Получаем локальный список фильмов для просмотра
  getToWatchMovies(): movie[] {
    return this.toWatchMovies;
  }

  // Добавляем фильм в избранное и обновляем локальный список
  addMovieToFavorites(movie: movie) {
    this.dataService.addMovieToFavorites(movie);
  }

  // Удаляем фильм из избранного и обновляем локальный список
  removeMovieFromFavorites(movie: movie) {
    this.dataService.removeMovieFromFavorites(movie);
  }

  // Добавляем фильм в список для просмотра и обновляем локальный список
  addMovieToWatchlist(movie: movie) {
    this.dataService.addMovieToWatchlist(movie);
  }

  // Удаляем фильм из списка для просмотра и обновляем локальный список
  removeMovieFromWatchlist(movie: movie) {
    this.dataService.removeMovieFromWatchlist(movie);
  }
}
