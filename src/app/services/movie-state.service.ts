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
  private favoriteMovies: movie[] = [];
  private toWatchMovies: movie[] = [];

  constructor(private dataService: DataService) {
    // Инициализируем локальные массивы значениями из DataService
    this.favoriteMovies = this.dataService.getFavoriteMovies();
    this.toWatchMovies = this.dataService.getToWatchMovies();
  }

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
    this.favoriteMovies = this.dataService.getFavoriteMovies();  
  }

  // Удаляем фильм из избранного и обновляем локальный список
  removeMovieFromFavorites(movie: movie) {
    this.dataService.removeMovieFromFavorites(movie);
    this.favoriteMovies = this.dataService.getFavoriteMovies();  
  }

  // Добавляем фильм в список для просмотра и обновляем локальный список
  addMovieToWatchlist(movie: movie) {
    this.dataService.addMovieToWatchlist(movie);
    this.toWatchMovies = this.dataService.getToWatchMovies();  
  }

  // Удаляем фильм из списка для просмотра и обновляем локальный список
  removeMovieFromWatchlist(movie: movie) {
    this.dataService.removeMovieFromWatchlist(movie);
    this.toWatchMovies = this.dataService.getToWatchMovies();  
  }
}
