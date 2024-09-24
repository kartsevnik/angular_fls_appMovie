import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { selectUpComingCurrentPage, selectUpComingMovies, selectUpComingLoading } from '../../store/selectors';
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

  //Store: Инжектируется в компонент для взаимодействия с хранилищем. Используется для отправки действий и подписки на изменения состояния.
  constructor(private store: Store<AppState>, private dataHandlerService: DataHandlerService) {
    this.upComingMovies$ = this.store.select(selectUpComingMovies); //select: Метод, который выбирает часть состояния из хранилища, используя селекторы.
    this.currentPage$ = this.store.select(selectUpComingCurrentPage);
    this.isLoading$ = this.store.select(selectUpComingLoading);
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Up Coming');
    this.store.dispatch(MoviesActions.loadUpComingMovies()); // dispatch: Метод, который отправляет действие в хранилище для изменения состояния.
  }

  loadNextPage() {
    this.store.dispatch(MoviesActions.loadUpComingMovies());  // Загружаем следующую страницу
  }
}
