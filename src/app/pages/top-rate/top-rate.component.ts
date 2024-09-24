import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataHandlerService } from '../../services/data-handler.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { Store } from '@ngrx/store';
import { selectTopRateCurrentPage, selectTopRateLoading, selectTopRateMovies } from '../../store/selectors';
import * as MoviesActions from '../../store/actions';

@Component({
  selector: 'app-top-rate',
  templateUrl: './top-rate.component.html',
  styleUrl: './top-rate.component.scss'
})
export class TopRateComponent {

  topRateMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<AppState>, private dataHandlerService: DataHandlerService) {
    this.topRateMovies$ = this.store.select(selectTopRateMovies)
    this.currentPage$ = this.store.select(selectTopRateCurrentPage)
    this.isLoading$ = this.store.select(selectTopRateLoading)
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Top Rate');
    // this.store.dispatch(MoviesActions.loadTopRateMovies());
  }



  loadNextPage() {
    this.store.dispatch(MoviesActions.loadTopRateMovies());
  }
}
