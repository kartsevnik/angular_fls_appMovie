import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { CarouselModule } from 'primeng/carousel';

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
  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  randomMovies: movieDB[] = []
  responsiveOptions: any[] | undefined;

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.dataHandlerService.changeCategory('Home');
    });

    this.loadMovies();
  }

  get selectedMovies() {
    return this.dataHandlerService.selectedMovies;
  }

  loadMovies() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.dataService.getMoviesTrending(this.currentPage).subscribe(movies => {
      this.movies = [...this.movies, ...movies.results];
      this.randomMovies = this.getRandomMoviesForSlider(3);
      // this.setImageUrl(randomMovie)
      // this.movieForHomeBlock = randomMovie
      console.log(this.movies);
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

    console.log(moviesForSlider);

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
