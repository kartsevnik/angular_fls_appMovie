import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { movieDB } from '../../models/api-movie-db';
import * as MoviesActions from '../../store/actions'
import { selectNowPlayingMovies, selectLoadingNowPlaying, selectNowPlayingCurrentPage } from '../../store/selectors';
import { AppState } from '../../store/state';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss'
})
export class NowPlayingComponent implements OnInit {

  // nowPlayingMovies: movieDB[] = []
  // currentPage = 1;
  // isLoading = false;  

  nowPlayingMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

 //Store: Инжектируется в компонент для взаимодействия с хранилищем. Используется для отправки действий и подписки на изменения состояния.
  constructor(private store: Store<AppState>) {
    this.nowPlayingMovies$ = this.store.select(selectNowPlayingMovies) //select: Метод, который выбирает часть состояния из хранилища, используя селекторы.
    this.isLoading$ = this.store.select(selectLoadingNowPlaying)
    this.currentPage$ = this.store.select(selectNowPlayingCurrentPage)
  }

  ngOnInit() {
    this.store.dispatch(MoviesActions.loadNowPlayingMovies()) // dispatch: Метод, который отправляет действие в хранилище для изменения состояния.
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadNowPlayingMovies()) // Загружаем следующую страницу
  }
}
