// DataHandlerService:
// управляет отображением фильмов в зависимости от категории,
// а также вызовами методов в MovieStateService для добавления / удаления фильмов.

import { Injectable } from '@angular/core';
import { movie } from '../models/movie';
import { DataService } from './data.service';
import { Category } from '../models/category';
import { MovieStateService } from './movie-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  selectedCategory = '';  // Выбранная категория фильмов
  movies: movie[] = [];  // Все фильмы
  selectedMovies: movie[] = [];  // Фильмы, отображаемые на текущей странице
  selectedMoviesOriginal: movie[] = [];  // Оригинальный список фильмов для сброса фильтров

  constructor(private dataService: DataService, private movieStateService: MovieStateService, private router: Router) {
    this.loadData();
  }

  // Загружаем данные при инициализации сервиса
  loadData() {
    this.movies = this.dataService.getMovies();
    this.updateSelectedMovies(this.selectedCategory);
  }

  // Меняем категорию фильмов и обновляем отображаемые фильмы
  changeCategory(nameOfCategory: string) {
    this.selectedCategory = nameOfCategory;
    this.updateSelectedMovies(nameOfCategory);
  }

  // Обновляем список фильмов в зависимости от выбранной категории
  updateSelectedMovies(selectedCategory: string) {
    switch (selectedCategory) {
      // case 'All Movies':
      //   this.selectedMovies = [...this.movies];
      //   this.selectedMoviesOriginal = this.movies;
      //   break;
      case 'Favorites':
        this.selectedMovies = this.movieStateService.getFavoriteMovies();
        this.selectedMoviesOriginal = this.movieStateService.getFavoriteMovies();
        break;
      case 'To Watch':
        this.selectedMovies = this.movieStateService.getToWatchMovies();
        this.selectedMoviesOriginal = this.movieStateService.getToWatchMovies();
        break;
      default:
        this.selectedMovies = this.movies;
        this.selectedMoviesOriginal = this.movies;
        break;
    }
  }

  // Добавляем или удаляем фильм из избранного
  updateFavoriteMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    if (event.action === 'add') {
      this.movieStateService.addMovieToFavorites(event.movie);
    } else {
      this.movieStateService.removeMovieFromFavorites(event.movie);
    }
  }

  // Добавляем или удаляем фильм из списка для просмотра
  updateWatchMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    if (event.action === 'add') {
      this.movieStateService.addMovieToWatchlist(event.movie);
    } else {
      this.movieStateService.removeMovieFromWatchlist(event.movie);
    }
  }

  // Фильтруем фильмы по поисковому запросу
  fillListByFind(searchText: string): void {
    const currentUrl = this.router.url; // Получаем текущий URL

    if (currentUrl === '/home') {
      // Если мы находимся на странице Home, перенаправляем на страницу поиска
      this.router.navigate(['/all-movies'], { queryParams: { query: searchText } });
    } else {
      // Если мы находимся на любой другой странице (например favorites), фильтруем текущие фильмы
      if (searchText.trim() === '') {
        this.selectedMovies = this.selectedMoviesOriginal;
      } else {
        this.selectedMovies = this.selectedMoviesOriginal.filter(movie =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    }
  }
}
