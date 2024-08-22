import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { movieDB } from '../../models/api-movie-db';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {

  popularMovies: movieDB[] = []
  currentPage = 1;
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Popular');
    this.loadMovies();
  }

  loadMovies() {
    if (this.isLoading) return;  // Если уже идет загрузка, ничего не делаем
    this.isLoading = true;

    this.dataService.getMoviesPopular(this.currentPage).subscribe(movies => {
      this.popularMovies = [...this.popularMovies, ...movies.results];
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
