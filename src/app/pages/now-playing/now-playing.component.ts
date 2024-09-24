import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { movieDB } from '../../models/api-movie-db';
import * as MoviesActions from '../../store/actions'
import { selectNowPlayingMovies, selectNowPlayingLoading, selectNowPlayingCurrentPage } from '../../store/selectors';
import { AppState } from '../../store/state';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss'
})
export class NowPlayingComponent implements OnInit {
  nowPlayingMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;


  constructor(private store: Store<AppState>, private dataHandlerService: DataHandlerService) {
    this.nowPlayingMovies$ = this.store.select(selectNowPlayingMovies) 
    this.isLoading$ = this.store.select(selectNowPlayingLoading)
    this.currentPage$ = this.store.select(selectNowPlayingCurrentPage)
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Now playing');
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadNowPlayingMovies()) 
  }
}
