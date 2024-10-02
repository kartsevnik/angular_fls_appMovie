import { Component, OnInit } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { combineLatest, distinctUntilChanged, Observable, skip, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectCurrentSearchAdult, selectCurrentSearchPage, selectCurrentSearchQuery, selectCurrentSearchYear, selectSearchError, selectSearchLoading, selectSearchResults } from '../../store/selectors';
import * as MoviesActions from '../../store/actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  isLoading = false;

  movies$: Observable<movieDB[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPage$: Observable<number>;
  currentQuery$: Observable<string>;
  currentAdult$: Observable<boolean>;
  currentYear$: Observable<string>;
  filterText = '';

  constructor(private store: Store<AppState>) {
    // Подписка на селекторы
    this.loading$ = this.store.pipe(select(selectSearchLoading));
    this.error$ = this.store.pipe(select(selectSearchError));
    this.currentPage$ = this.store.pipe(select(selectCurrentSearchPage));
    this.currentQuery$ = this.store.pipe(select(selectCurrentSearchQuery));
    this.currentAdult$ = this.store.pipe(select(selectCurrentSearchAdult));
    this.currentYear$ = this.store.pipe(select(selectCurrentSearchYear)) as Observable<string>;
    this.movies$ = this.store.pipe(select(selectSearchResults));
  }

  ngOnInit(): void {
    this.loading$.subscribe(loading => {
      if (!loading) {
        this.isLoading = false; // Сбрасываем флаг после завершения загрузки
      }
    });
    this.store.pipe(select(selectCurrentSearchQuery)).subscribe(query => {
      console.log('HeaderComponent - currentSearchQuery:', query);
      this.filterText = query; // Обновляем `filterText` из Store
    });
    combineLatest([
      this.store.pipe(select(selectCurrentSearchQuery), skip(1), distinctUntilChanged()),
      this.store.pipe(select(selectCurrentSearchAdult), skip(1), distinctUntilChanged()),
      this.store.pipe(select(selectCurrentSearchYear), skip(1), distinctUntilChanged()),
    ]).subscribe(([query, adult, year]) => {
      console.log('Параметры поиска:', query, adult, year);
      this.filterText = query;
    });
  }

  

  loadNextPage() {
    if (this.isLoading) {
      return; // Предотвращаем повторный вызов, если загрузка уже выполняется
    }
    this.isLoading = true; // Устанавливаем флаг загрузки

    combineLatest([this.currentPage$, this.currentAdult$, this.currentYear$, this.currentQuery$]).pipe(
      take(1),
    ).subscribe(([currentPage, currentAdult, currentYear, query]) => {
      if (query && query.trim() !== '') {
        console.log('Loading next page:', currentPage);
        this.store.dispatch(MoviesActions.searchMovies({
          query: query.trim(),
          include_adult: currentAdult,
          year: currentYear,
          page: currentPage
        }));
      }
    });
  }

}
