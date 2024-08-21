import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { movieDB } from '../../models/api-movie-db';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrl: './saved-movies.component.scss'
})
export class SavedMoviesComponent {

  savedMovies: movieDB[] = []
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно
  nameOfCategory: string = ''
  constructor(
    private dataService: DataService,
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
      console.log(category);

      if (category) {
        if (category === 'favorites') {
          this.dataHandlerService.changeCategory("Favorites"); // Обновляем категорию в сервисе
          this.nameOfCategory = "favorites"
          this.savedMovies = this.dataService.getFavoriteMovies();
        } else if (category === 'watch-list') {
          this.dataHandlerService.changeCategory("Watch list"); // Обновляем категорию в сервисе
          this.nameOfCategory = "watch"

          this.savedMovies = this.dataService.getToWatchMovies();
        }
      }
    });
  }

  loadNextPage() {
    // Заглушка, так как для избранных и списка для просмотра нет пагинации
  }

}
