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


  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.dataHandlerService.changeCategory(category);
    });
  }

  // при изменении значений в selectedCategory вызывается метод сервиса обновляющий данные
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.dataHandlerService.updateSelectedMovies(this.selectedCategory);
    }
  }

  // получаем текущую категорию из сервиса
  get selectedCategory() {
    return this.dataHandlerService.selectedCategory;
  }

  // получаем текущий список фильмов из сервиса
  get selectedMovies() {
    return this.dataHandlerService.selectedMovies;
  }

  // метод который вызывает метод сервиса при нажатии на кнопку Favorite и вызывает необходимое действие
  updateFavoriteMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateFavoriteMovies(event);
  }

  // метод который вызывает метод сервиса при нажатии на кнопку To Watch и вызывает необходимое действие
  updateWatchMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateWatchMovies(event);
  }

  trackById(index: number, item: movie) {
    return item.id;
  }

}
