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

  // selectedCategory: string = '';
  selectedMovies: movieDB[] = [];

  isLoading = false;

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupObserver();
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
