import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { movie } from '../../models/movie';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnChanges, OnInit {

  movieForHomeBlock: movie | null = null;

  constructor(private dataHandlerService: DataHandlerService) {}
  ngOnInit(): void {
    this.movieForHomeBlock = this.selectedMovies[2];
    console.log(this.movieForHomeBlock.imgLargePath);
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

  // метод который вызывает метод сервиса при нажатии на кнопку Favorite и передает необходимые данные
  updateFavoriteMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateFavoriteMovies(event);
  }

  // метод который вызывает метод сервиса при нажатии на кнопку Watch и передает необходимые данные
  updateWatchMovies(event: { movie: movie, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateWatchMovies(event);
  }

  trackById(index: number, item: movie) {
    return item.id;
  }

  getBackgroundImage(): string {
    return this.movieForHomeBlock?.imgLargePath ? `url(${this.movieForHomeBlock.imgLargePath})` : '';
  }

  shouldDisplayMovieList(): boolean {
    const categoriesToShow = ['Home', 'All Movies', 'Favorites', 'To Watch'];
    return categoriesToShow.includes(this.selectedCategory);
  }
}
