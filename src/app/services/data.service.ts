// DataService 
// является источником данных, и любые операции с данными(добавление, удаление) выполняются через этот сервис.


import { Injectable } from '@angular/core';
import { movie } from '../models/movie';
import { Category } from '../models/category';
import { categoryList } from '../mock-data/mock-data';
import { movies } from '../mock-data/mock-data';
import { favoriteMovies } from '../mock-data/mock-data';
import { toWatchMovies } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  // Получаем список всех категорий
  getCategoryList() {
    return categoryList;
  }

  // Получаем список всех фильмов
  getMovies() {
    return movies;
  }

  // =================> Favorites

  // Получаем список избранных фильмов
  getFavoriteMovies() {
    return favoriteMovies;
  }

  // Добавляем фильм в список избранных
  addMovieToFavorites(movie: movie) {
    favoriteMovies.push(movie);
  }

  // Удаляем фильм из списка избранных
  removeMovieFromFavorites(movie: movie) {
    const index = favoriteMovies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    }
  }

  // =================> ToWatch

  // Получаем список фильмов для просмотра
  getToWatchMovies() {
    return toWatchMovies;
  }

  // Добавляем фильм в список для просмотра
  addMovieToWatchlist(movie: movie) {
    toWatchMovies.push(movie);
  }

  // Удаляем фильм из списка для просмотра
  removeMovieFromWatchlist(movie: movie) {
    const index = toWatchMovies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      toWatchMovies.splice(index, 1);
    }
  }

  // =================> detail view

  // Получаем фильм по его ID
  getMovieById(id: number): movie | undefined {
    return this.getMovies().find(movie => movie.id === id);
  }
}

