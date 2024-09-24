import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { selectUpComingCurrentPage, selectUpComingLoading, selectUpComingMovies } from '../../store/selectors';
import { Store } from '@ngrx/store';
import * as MoviesActions from '../../store/actions';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {

  upComingMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  constructor(private store: Store<AppState>, private dataHandlerService: DataHandlerService) {
    this.upComingMovies$ = this.store.select(selectUpComingMovies);
    this.currentPage$ = this.store.select(selectUpComingCurrentPage);
    this.isLoading$ = this.store.select(selectUpComingLoading);
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Up Coming');
    this.store.dispatch(MoviesActions.resetUpComingCurrentPage());
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadUpComingMovies());
  }
}
