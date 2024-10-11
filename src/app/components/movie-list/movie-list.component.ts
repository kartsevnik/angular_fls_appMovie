import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  @Input() movies: movieDB[] = []
  @Input() loadNextPage!: () => void; // Take the method of downloading the next page
  @ViewChild('anchor') anchor!: ElementRef; // anchor to track the end of the list
  private observer!: IntersectionObserver;

  isLoading = false;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
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
