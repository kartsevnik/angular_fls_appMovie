import { Component } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies: movieDB[] = []
  currentPage = 1;

  // Флаг для предотвращения множественных запросов одновременно во время дозагрузки фильмов
  isLoading = false;

  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  randomMovies: movieDB[] = []
  responsiveOptions: any[] | undefined;

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.changeCategory('Home');
    this.loadMovies();
  }

  // get selectedMovies() {
  //   return this.dataHandlerService.selectedMovies;
  // }

  loadMovies() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.dataService.getMoviesTrending(this.currentPage).subscribe(movies => {
      this.movies = [...this.movies, ...movies.results];
      
      if (this.randomMovies.length == 0) {
        this.randomMovies = this.getRandomMoviesForSlider(3);
      }

      this.isLoading = false;

    }, () => {
      this.isLoading = false;
    });
  }

  getRandomMoviesForSlider(quantityOfMovies: number): movieDB[] {
    const minV = 0;
    const maxV = this.movies.length;
    let moviesForSlider: movieDB[] = [];

    while (moviesForSlider.length < quantityOfMovies) {
      const randomIndex = minV + Math.floor(Math.random() * (maxV - minV));
      const randomMovie = this.movies[randomIndex];

      // Проверяем, есть ли уже этот фильм в массиве
      if (!moviesForSlider.some(movie => movie.id === randomMovie.id)) {
        moviesForSlider.push(randomMovie);
      }
    }

    return moviesForSlider;
  }

  loadNextPage() {
    this.currentPage++;
    this.loadMovies();
  }

  getMovieImageUrl(movie: movieDB): string {
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

}
