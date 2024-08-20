import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { movie } from '../../models/movie';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnChanges, OnInit {
  selectedCategory: string = '';
  selectedMovies: movie[] = [];

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Подписываемся на изменения параметров маршрута (например, 'category' в URL)
    this.route.params.subscribe(params => {
      // Извлекаем значение параметра 'category' из URL
      const category = params['category'];
  
      // Обновляем категорию в сервисе 
      this.dataHandlerService.changeCategory(category);
      // Обновляем категорию в локальном свойстве selectedCategory
      this.selectedCategory = this.dataHandlerService.selectedCategory;

      // Обновляем список фильмов
      this.updateMovies();
    });
  }
  

  // при изменении значений в selectedCategory вызывается метод сервиса обновляющий данные
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.dataHandlerService.updateSelectedMovies(this.selectedCategory);
    }
  }

    // Метод для обновления списка фильмов
    private updateMovies(): void {
      this.selectedMovies = this.dataHandlerService.selectedMovies;
    }


  // метод который вызывает метод сервиса при нажатии на кнопку Favorite и вызывает необходимое действие
  updateFavoriteMovies(movieAction: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateFavoriteMovies(movieAction);
  }

  // метод который вызывает метод сервиса при нажатии на кнопку To Watch и вызывает необходимое действие
  updateWatchMovies(movieAction: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateWatchMovies(movieAction);
  }

  trackById(index: number, item: movie) {
    return item.id;
  }

}
