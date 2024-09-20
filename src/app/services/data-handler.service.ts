import { Injectable } from '@angular/core';
import { DataService } from './data.service';
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
  shouldClearSearchInput = true;

  constructor(private dataService: DataService, private store: Store) {
  }

  changeCategory(nameOfCategory: string) {
    this.selectedCategorySubject.next(nameOfCategory); // Обновляем значение категории
  }

  // Для updateFavoriteMovies
  // updateFavoriteMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
  //   if (movieAction.action === 'add') {
  //     this.store.dispatch(MoviesActions.addMovieToFavorites({ movie: movieAction.movie }));
  //   } else if (movieAction.action === 'remove') {
  //     this.store.dispatch(MoviesActions.removeMovieFromFavorites({ movie: movieAction.movie }));
  //   }
  //   }

  // Для updateWatchMovies
  // updateWatchMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
  //   if (movieAction.action === 'add') {
  //     this.store.dispatch(MoviesActions.addMovieToWatchlist({ movie: movieAction.movie }));
  //   } else if (movieAction.action === 'remove') {
  //     this.store.dispatch(MoviesActions.removeMovieFromWatchlist({ movie: movieAction.movie }));
  //   }
  // }

  fillListByFind(searchText: string): void {
  }
}
