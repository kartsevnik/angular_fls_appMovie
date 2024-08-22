import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';
import { movieDB } from '../../models/api-movie-db';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  @Input() movies: movieDB[] = []
  @Input() loadNextPage!: () => void; // Принимаем метод загрузки следующей страницы
  @ViewChild('anchor') anchor!: ElementRef; // Якорь для отслеживания конца списка
  private observer!: IntersectionObserver;

  selectedCategory: string = '';
  selectedMovies: movieDB[] = [];

  isLoading = false;

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Обновляем категорию в сервисе 
    this.dataHandlerService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
  }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  // метод который вызывает метод сервиса при нажатии на кнопку Favorite и вызывает необходимое действие
  updateFavoriteMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
    this.dataHandlerService.updateFavoriteMovies(movieAction);
  }

  // метод который вызывает метод сервиса при нажатии на кнопку To Watch и вызывает необходимое действие
  updateWatchMovies(movieAction: { movie: movieDB, action: 'add' | 'remove' }) {
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
