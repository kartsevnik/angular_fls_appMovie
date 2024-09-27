import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataHandlerService } from '../../services/data-handler.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { select, Store } from '@ngrx/store';
import * as MoviesActions from '../../store/actions';
import {
  selectCurrentCategoryMovies,
  selectCurrentCategoryLoading,
  selectCurrentCategoryCurrentPage
} from '../../store/selectors';
import { MovieCategory } from '../../models/movie-category.enum';

@Component({
  selector: 'app-top-rate',
  templateUrl: './top-rate.component.html',
  styleUrl: './top-rate.component.scss'
})
export class TopRateComponent {
  movies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.movies$ = this.store.pipe(select(selectCurrentCategoryMovies));
    this.isLoading$ = this.store.pipe(select(selectCurrentCategoryLoading));
    this.currentPage$ = this.store.pipe(select(selectCurrentCategoryCurrentPage));
  }

  ngOnInit() {
    this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.TopRate }));
  }


  loadNextPage() {
    this.store.dispatch(MoviesActions.loadMovies({ category: MovieCategory.TopRate }));
  }
}
