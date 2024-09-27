import { Component } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import * as MoviesActions from '../../store/actions';
import { selectTrendCurrentPage, selectTrendLoading, selectTrendMovies } from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // movies: movieDB[] = []
  // currentPage = 1;

  trendMovies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  randomMovies$: Observable<movieDB[]> | undefined;

  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  constructor(private store: Store<AppState>, private dataHandlerService: DataHandlerService) {
    this.trendMovies$ = this.store.select(selectTrendMovies);
    this.currentPage$ = this.store.select(selectTrendCurrentPage);
    this.isLoading$ = this.store.select(selectTrendLoading);
  }

  ngOnInit(): void {
    // this.dataHandlerService.changeCategory('Home');
    this.store.dispatch(MoviesActions.setSelectedCategory({ category: 'Home' }));
    this.store.dispatch(MoviesActions.loadTrendMovies())
  }


  getRandomMoviesForSlider(movies: movieDB[], quantityOfMovies: number): movieDB[] {
    const minV = 0;
    const maxV = movies.length;
    let moviesForSlider: movieDB[] = [];

    if (maxV === 0) {
      return moviesForSlider; // Return an empty array if there are no films
    }

    while (moviesForSlider.length < quantityOfMovies) {
      const randomIndex = minV + Math.floor(Math.random() * (maxV - minV));
      const randomMovie = movies[randomIndex];

      // We check if this film is already in the array
      if (!moviesForSlider.some(movie => movie.id === randomMovie.id)) {
        moviesForSlider.push(randomMovie);
      }

      // Add a check in case the number of unique films is less than the required
      if (moviesForSlider.length === movies.length) {
        break;
      }
    }

    return moviesForSlider;
  }
  // loadNextPage() {
  //   this.store.dispatch(MoviesActions.loadTrendMovies());
  // }

  getMovieImageUrl(movie: movieDB): string {
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

}
