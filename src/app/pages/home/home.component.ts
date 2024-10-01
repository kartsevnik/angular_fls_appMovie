import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { movieDB } from '../../models/api-movie-db';
import { MovieCategory } from '../../models/movie-category.enum';

import { select, Store } from '@ngrx/store';
import * as MoviesActions from '../../store/actions';
import { AppState } from '../../store/state';
import { selectCurrentCategoryCurrentPage, selectCurrentCategoryLoading, selectCurrentCategoryMovies, selectGenres } from '../../store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies$: Observable<movieDB[]>;
  isLoading$: Observable<boolean>;
  currentPage$: Observable<number>;

  randomMovies$: Observable<movieDB[]> | undefined;
  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  movie: movieDB | undefined;
  visible = false

  constructor(private store: Store<AppState>) {
    this.movies$ = this.store.pipe(select(selectCurrentCategoryMovies));
    this.isLoading$ = this.store.pipe(select(selectCurrentCategoryLoading));
    this.currentPage$ = this.store.pipe(select(selectCurrentCategoryCurrentPage));

  }

  ngOnInit(): void {
    // В методе ngOnInit() компонента HomeComponent вы вызываете действие setSelectedCategory, чтобы установить выбранную категорию на MovieCategory.Home.
    // Действие, которое отправляется: setSelectedCategory с параметром { category: MovieCategory.Home }

    this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Home }));
    this.randomMovies$ = this.movies$.pipe(
      map(movies => this.getRandomMoviesForSlider(movies, 3))
    );
  }


  getRandomMoviesForSlider(movies: movieDB[], quantityOfMovies: number): movieDB[] {
    const minV = 0;
    // movies = movies.filter(movie => movie.video == true)
    // console.log(movies);

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
