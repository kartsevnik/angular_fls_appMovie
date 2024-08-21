import { Component } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent {

  upcomingMovies: movieDB[] = []
  currentPage = 1;
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Upcoming');
    this.loadMovies();
  }

  loadMovies() {
    if (this.isLoading) return;  // Если уже идет загрузка, ничего не делаем
    this.isLoading = true;

    this.dataService.getMoviesUpcoming(this.currentPage).subscribe(movies => {
      this.upcomingMovies = [...this.upcomingMovies, ...movies.results];
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
