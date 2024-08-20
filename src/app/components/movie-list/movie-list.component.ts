import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';
import { movieDB } from '../../models/api-movie-db';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnChanges, OnInit {
  @Input() movies: movieDB[] = []
  @Input() loadNextPage!: () => void; // Принимаем метод загрузки следующей страницы
  @ViewChild('anchor') anchor!: ElementRef; // Якорь для отслеживания конца списка

  private observer!: IntersectionObserver;
  selectedCategory: string = '';
  selectedMovies: movieDB[] = [];
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

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

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  // Метод для обновления списка фильмов
  private updateMovies(): void {
    this.selectedMovies = this.dataHandlerService.selectedMovies;
  }


  // метод который вызывает метод сервиса при нажатии на кнопку Favorite и вызывает необходимое действие
  updateFavoriteMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
    console.log(movieAction);
    this.dataHandlerService.updateFavoriteMovies(movieAction);
  }

  // метод который вызывает метод сервиса при нажатии на кнопку To Watch и вызывает необходимое действие
  updateWatchMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
    console.log(movieAction);

    this.dataHandlerService.updateWatchMovies(movieAction);
  }

  trackById(index: number, item: movieDB) {
    return item.id;
  }

  private setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading) {
          this.isLoading = true;
          this.loadNextPage();
          this.isLoading = false;
        }
      });
    });

    this.observer.observe(this.anchor.nativeElement);
  }
}
