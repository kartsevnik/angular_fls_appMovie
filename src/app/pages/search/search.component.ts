import { Component, OnInit } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { combineLatest, Observable, take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectCurrentSearchPage, selectCurrentSearchQuery, selectSearchError, selectSearchLoading, selectSearchResults } from '../../store/selectors';
import * as MoviesActions from '../../store/actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  movies$: Observable<movieDB[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPage$: Observable<number>;
  currentQuery$: Observable<string>;
  filterText = '';

  constructor(private store: Store<AppState>) {
    // Подписка на селекторы
    this.movies$ = this.store.pipe(select(selectSearchResults));
    this.loading$ = this.store.pipe(select(selectSearchLoading));
    this.error$ = this.store.pipe(select(selectSearchError));
    this.currentPage$ = this.store.pipe(select(selectCurrentSearchPage));
    this.currentQuery$ = this.store.pipe(select(selectCurrentSearchQuery));
  }

  ngOnInit(): void {
    this.store.pipe(select(selectCurrentSearchQuery)).subscribe(query => {
      console.log('HeaderComponent - currentSearchQuery:', query);
      this.filterText = query; // Обновляем `filterText` из Store
    });
  }

  loadNextPage() {
    // Получение текущей страницы и запроса из Store
    combineLatest([this.currentPage$, this.currentQuery$]).pipe(
      take(1),
    ).subscribe(([currentPage, query]) => {
      if (query && query.trim() !== '') {
        console.log('Loading next page:', currentPage + 1);
        this.store.dispatch(MoviesActions.searchMovies({ query: query.trim(), page: currentPage + 1 }));
      }
    });
  }

}
