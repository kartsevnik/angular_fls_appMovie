import { Injectable } from '@angular/core';
import { movieDB } from '../models/api-movie-db';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectGenres } from '../store/selectors';
import { AppState } from '../store/state';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  setAccountId: number = 0
  genres$: Observable<any[]>

  private selectedCategorySubject = new BehaviorSubject<string>(''); // Создаём BehaviorSubject
  selectedCategory$ = this.selectedCategorySubject.asObservable(); // Экспортируем как Observable
  shouldClearSearchInput = true;

  constructor(private store: Store<AppState>) {
    this.genres$ = this.store.pipe(select(selectGenres));
  }

  changeCategory(nameOfCategory: string) {
    this.selectedCategorySubject.next(nameOfCategory);
  }
  // Возвращает Observable массива жанров
  getNamesGenres(movie: movieDB): Observable<string[]> {
    return this.genres$.pipe(
      take(1),
      map(genres =>
        movie.genre_ids.map(id => {
          const genre = genres.find(g => g.id === id);
          return genre ? genre.name : '';
        }).filter(name => name !== '')
      )
    );
  }

  fillListByFind(searchText: string): void {

  }
}