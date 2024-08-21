import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieForHomeBlock: movieDB | null = null;

  movies: movieDB[] = []
  currentPage = 1;
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      // this.dataHandlerService.changeCategory(category);
      this.dataHandlerService.changeCategory('Home');
      this.movieForHomeBlock = this.selectedMovies[2];
    });
    this.loadMovies();
  }

  get selectedMovies() {
    return this.dataHandlerService.selectedMovies;
  }



  loadMovies() {
    if (this.isLoading) return;  // Если уже идет загрузка, ничего не делаем
    this.isLoading = true;

    this.dataService.getMoviesTrending(this.currentPage).subscribe(movies => {
      this.movies = [...this.movies, ...movies.results];
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
