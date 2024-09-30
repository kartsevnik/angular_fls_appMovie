import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectSelectedCategory } from '../../store/selectors';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  @Input() movies: movieDB[] = []
  @Input() loadNextPage!: () => void; // Take the method of downloading the next page
  @ViewChild('anchor') anchor!: ElementRef; // anchor to track the end of the list
  private observer!: IntersectionObserver;

  selectedCategory: string = '';
  selectedMovies: movieDB[] = [];

  isLoading = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    const categorySubscription = this.store.pipe(
      select(selectSelectedCategory)
    ).subscribe(category => {
      this.selectedCategory = category;
      // console.log('Текущая категория:', this.selectedCategory);
      // Вы можете выполнять дополнительные действия при изменении категории
    });
  }

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  trackById(index: number, item: movieDB) {
    return item.id;
  }

  private setupObserver() {
    if (this.selectedCategory != 'Home') {
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
}
