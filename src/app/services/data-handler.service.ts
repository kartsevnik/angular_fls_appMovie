import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MovieStateService } from './movie-state.service';
import { Router } from '@angular/router';
import { movieDB } from '../models/api-movie-db';
import { BehaviorSubject } from 'rxjs';
import * as MoviesActions from '../store/actions'; // Убедитесь, что путь корректен
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  setAccountId: number = 0

  private selectedCategorySubject = new BehaviorSubject<string>(''); // Создаём BehaviorSubject
  selectedCategory$ = this.selectedCategorySubject.asObservable(); // Экспортируем как Observable

  // movies: movieDB[] = [];
  // selectedMovies: movieDB[] = [];
  // selectedMoviesOriginal: movieDB[] = [];

  shouldClearSearchInput = true;

  constructor(private dataService: DataService, private movieStateService: MovieStateService, private router: Router, private store: Store) {
    // this.loadData();
  }

  // loadData() {
  //   // this.movies = this.dataService.getMovies();
  //   // this.updateSelectedMovies(this.selectedCategorySubject.value);
  // }

  changeCategory(nameOfCategory: string) {
    this.selectedCategorySubject.next(nameOfCategory); // Обновляем значение категории
    // this.updateSelectedMovies(nameOfCategory);
  }

  // updateSelectedMovies(selectedCategory: string) {
  //   switch (selectedCategory) {
  //     case 'favorites':
  //       this.selectedMovies = this.movieStateService.getFavoriteMovies();
  //       this.selectedMoviesOriginal = this.movieStateService.getFavoriteMovies();
  //       break;
  //     case 'watch-list':
  //       this.selectedMovies = this.movieStateService.getToWatchMovies();
  //       this.selectedMoviesOriginal = this.movieStateService.getToWatchMovies();
  //       break;
  //     default:
  //       this.selectedMovies = this.movies;
  //       this.selectedMoviesOriginal = this.movies;
  //       break;
  //   }
  // }

  // updateFavoriteMovies(event: { movie: movieDB, action: 'add' | 'remove' }) {
  //   if (event.action === 'add') {
  //     this.movieStateService.addMovieToFavorites(event.movie);
  //   } else {
  //     this.movieStateService.removeMovieFromFavorites(event.movie);
  //   }
  // }

  // updateWatchMovies(event: { movie: movieDB, action: 'add' | 'remove' }) {
  //   if (event.action === 'add') {
  //     this.movieStateService.addMovieToWatchlist(event.movie);
  //   } else {
  //     this.movieStateService.removeMovieFromWatchlist(event.movie);
  //   }
  // }


// Для updateFavoriteMovies
updateFavoriteMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
  if (movieAction.action === 'add') {
    this.store.dispatch(MoviesActions.addMovieToFavorites({ movie: movieAction.movie }));
  } else if (movieAction.action === 'remove') {
    this.store.dispatch(MoviesActions.removeMovieFromFavorites({ movie: movieAction.movie }));
  }
}

// Для updateWatchMovies
updateWatchMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
  if (movieAction.action === 'add') {
    this.store.dispatch(MoviesActions.addMovieToWatchlist({ movie: movieAction.movie }));
  } else if (movieAction.action === 'remove') {
    this.store.dispatch(MoviesActions.removeMovieFromWatchlist({ movie: movieAction.movie }));
  }
}


  fillListByFind(searchText: string): void {
  //   const currentUrl = this.router.url;

  //   if (currentUrl === '/home') {
  //     this.shouldClearSearchInput = false;
  //     this.router.navigate(['/all-movies'], { queryParams: { query: searchText } });
  //     setTimeout(() => {
  //       if (searchText.trim() === '') {
  //         this.selectedMovies = this.selectedMoviesOriginal;
  //       } else {
  //         this.selectedMovies = this.selectedMoviesOriginal.filter(movie =>
  //           movie.title.toLowerCase().includes(searchText.toLowerCase())
  //         );
  //       }
  //     }, 0);
  //   } else {
  //     this.shouldClearSearchInput = true;
  //     if (searchText.trim() === '') {
  //       this.selectedMovies = this.selectedMoviesOriginal;
  //     } else {
  //       this.selectedMovies = this.selectedMoviesOriginal.filter(movie =>
  //         movie.title.toLowerCase().includes(searchText.toLowerCase())
  //       );
  //     }
  //   }
  }
}
