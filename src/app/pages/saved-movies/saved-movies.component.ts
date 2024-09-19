import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { movieDB } from '../../models/api-movie-db';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../../services/data-handler.service';
import { AppState } from '../../store/state'; // Убедитесь, что путь корректен
import { selectFavoriteMovies, selectToWatchMovies } from '../../store/selectors'; // Убедитесь, что путь корректен
import { Observable } from 'rxjs';


@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrl: './saved-movies.component.scss'
})
export class SavedMoviesComponent {
  savedMovies$!: Observable<movieDB[]>;

  // Переменная для текста в шаблоне
  nameOfCategory: string = ''

   // Флаг для предотвращения множественных запросов одновременно
  isLoading = false; 
  
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private dataHandlerService: DataHandlerService
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    // Получаем параметр из ActivatedRoute
    this.activatedRoute.url.subscribe(urlSegments => {
      const category = urlSegments[0]?.path;

      if (category) {
        if (category === 'favorites') {
          this.dataHandlerService.changeCategory("Favorites"); // Обновляем категорию в сервисе
          this.nameOfCategory = "favorites"
          this.savedMovies$ = this.store.select(selectFavoriteMovies);
        } else if (category === 'watch-list') {
          this.dataHandlerService.changeCategory("Watch list"); // Обновляем категорию в сервисе
          this.nameOfCategory = "watch"
          this.savedMovies$ = this.store.select(selectToWatchMovies);
        }
      }
    });
  }

  loadNextPage() {
    // Заглушка, так как для избранных и списка для просмотра нет пагинации
  }

}
