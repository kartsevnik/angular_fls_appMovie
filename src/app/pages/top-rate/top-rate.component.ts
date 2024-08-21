import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-top-rate',
  templateUrl: './top-rate.component.html',
  styleUrl: './top-rate.component.scss'
})
export class TopRateComponent {

  topRateMovies: movieDB[] = []
  currentPage = 1;
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Top Rate');
    this.loadMovies();
  }

  loadMovies() {
    if (this.isLoading) return;  // Если уже идет загрузка, ничего не делаем
    this.isLoading = true;

    this.dataService.getMoviesTopRated(this.currentPage).subscribe(movies => {
      this.topRateMovies = [...this.topRateMovies, ...movies.results];
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  loadNextPage() {
    this.currentPage++;
    this.loadMovies();
  }
}
