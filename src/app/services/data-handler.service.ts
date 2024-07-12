import { Injectable } from '@angular/core';
import { movie } from '../models/movie';
import { DataService } from './data.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // выбранная категория
  selectedCategory = ''
  // текущий массив отображаемый на странице сделан для удобства управления и фильтрации
  selectedMovies: movie[] = []
  // оригинальный массив для метода поиск и возврата в исходное состояние
  selectedMoviesOriginal: movie[] = []

  //начальное объявление переменных
  movies: movie[] = []
  favoriteMovies: movie[] = []
  toWatchMovies: movie[] = []
  categoryList: Category[] = []

  // Ваш комментарий: Не дуже розумію суть такого запису. Якщо ви хочете додати новий елемент, то це можна зробити ось так:
  //   movies: movie[] = [];
  // const newMovie = {
  //     id: 1,
  //     title: "The Shawshank Redemption",
  //     year: 1994,
  //     duration: 142,
  //     imageUrl: "../../../assets/img-movies/The Shawshank Redemption.jpg",
  //     watched: false,
  //     favorite: false,
  //     rating: 9.3,
  //     description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  //     quality: "HD"
  //   }
  // this.movies.push(newMovie);

  // Мое пояснение: Дело в том что я создал модель с названием movieи по ее параметрам создаю новые объекты, 
  // в перспективе эти данные планирую перенести в локальную базу данных, как только объект будет наполнен все необходимыми аттрибутами



  constructor(private dataService: DataService) {
    this.loadData()
  }

  loadData() {
    //загрузка данных из Дата сервиса 
    this.movies = this.dataService.movies
    this.favoriteMovies = this.dataService.favoriteMovies
    this.toWatchMovies = this.dataService.toWatchMovies
    this.categoryList = this.dataService.categoryList

    //отображение согласно категории по умолчанию из header
    this.updateSelectedMovies(this.selectedCategory);
  }

  // метод изменения категории
  changeCategory(nameOfCategory: string) {
    this.selectedCategory = nameOfCategory
    this.updateSelectedMovies(nameOfCategory);
  }

  // метод обновления данными текущего массива с учетом выбранной категории
  updateSelectedMovies(selectedCategory: string) {
    switch (selectedCategory) {
      case 'All Movies':
        this.selectedMovies = [...this.movies];
        this.selectedMoviesOriginal = this.movies;
        console.log("updateSelectedMovies.selectedCategory:" + selectedCategory);

        break;
      case 'Favorites':
        this.selectedMovies = this.favoriteMovies;
        this.selectedMoviesOriginal = this.favoriteMovies;
        console.log("updateSelectedMovies.selectedCategory:" + selectedCategory);
        break;
      case 'To Watch':
        this.selectedMovies = this.toWatchMovies;
        this.selectedMoviesOriginal = this.toWatchMovies;
        console.log("updateSelectedMovies.selectedCategory:" + selectedCategory);
        break;
      default:
        this.selectedMovies = this.movies;
        this.selectedMoviesOriginal = this.movies;
        break;
    }
  }

  forceUpdateCategory(nameOfCategory: string) {
    this.changeCategory('');
    setTimeout(() => {
      this.changeCategory(nameOfCategory);
    }, 0);
  }

  // метод добавления и удаления фильма в Favorite
  updateFavoriteMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    if (event.action === 'add') {
      this.favoriteMovies.push(event.movie);
    } else {
      this.favoriteMovies = this.favoriteMovies.filter(m => m.id !== event.movie.id);
    }
  }
  // метод добавления и удаления фильма в toWatch
  updateWatchMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    if (event.action === 'add') {
      this.toWatchMovies.push(event.movie);
    } else {
      this.toWatchMovies = this.toWatchMovies.filter(m => m.id !== event.movie.id);
    }
  }

  // метода отображения результатов поиска
  fillListByFind(searchText: string): void {
    this.changeCategory('All Movies')
    if (searchText.trim() === '') {
      this.selectedMovies = this.selectedMoviesOriginal;
    } else {
      this.selectedMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }
}
