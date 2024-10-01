import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { selectFavoriteMovies, selectGenres, selectToWatchMovies } from '../../store/selectors';
import { map, take } from 'rxjs/operators';
import * as MoviesActions from '../../store/actions';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit, OnChanges {

  @Input() movie: movieDB | undefined;
  isFavorite$!: Observable<boolean>;
  isToWatch$!: Observable<boolean>;

  genres: any[] = []

  // genres$: Observable<any[]>
  // genreNames: string[] = []

  visible: boolean = false;
  selectedMovie: Partial<movieDB> | null = null;
  scrollPosition = 0; // to maintain the position of the scroll

  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  constructor(private store: Store<AppState>, private dataHandler: DataHandlerService) {
    // this.genres$ = this.store.pipe(select(selectGenres));
  }

  ngOnInit() {
    this.setImageUrl();
    this.initializeObservables();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie'] && this.movie) {
      this.setImageUrl();
      this.initializeObservables();
    }
  }

  setImageUrl() {
    if (this.movie) {
      this.imageUrlPoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      this.imageUrlBackdrop = `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
    }
  }

  initializeObservables() {
    if (this.movie) {
      this.isFavorite$ = this.store.pipe(
        select(selectFavoriteMovies),
        map(movies => movies.some(m => m.id === this.movie!.id))
      );
      this.isToWatch$ = this.store.pipe(
        select(selectToWatchMovies),
        map(movies => movies.some(m => m.id === this.movie!.id))
      );
    }
  }

  // getNamesGenres(movie: movieDB): void {
  //   this.genres$.pipe(take(1)).subscribe(genres => {
  //     this.genreNames = movie.genre_ids.map(id => {
  //       const genre = genres.find(g => g.id === id);
  //       return genre ? genre.name : '';
  //     }).filter(name => name !== '');
  //     // console.log('Жанры фильма:', this.genreNames);
  //   });
  // }


  showDialog() {
    if (this.movie) {
      this.saveScrollPosition(); // Save the position of the scroll before the opening
      this.selectedMovie = this.movie;
      this.visible = true;

      // Подписываемся на Observable, чтобы получить жанры
      this.dataHandler.getNamesGenres(this.movie).pipe(take(1)).subscribe(genres => {
        this.genres = genres;
      });
    }
  }


  hideDialog() {
    this.visible = false;
    this.restoreScrollPosition(); // Restore the position of the scroll after closing
  }

  saveScrollPosition() {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  restoreScrollPosition() {
    window.scrollTo({ top: this.scrollPosition, behavior: 'auto' });
  }

  toggleWatchList() {
    if (this.movie) {
      this.isToWatch$.pipe(take(1)).subscribe(isInWatchlist => {
        if (isInWatchlist) {
          this.store.dispatch(MoviesActions.removeMovieFromWatchlist({ movie: this.movie! }));
        } else {
          this.store.dispatch(MoviesActions.addMovieToWatchlist({ movie: this.movie! }));
        }
      });
    }
  }

  toggleFavoritesList() {
    if (this.movie) {
      this.isFavorite$.pipe(take(1)).subscribe(isInFavorites => {
        if (isInFavorites) {
          this.store.dispatch(MoviesActions.removeMovieFromFavorites({ movie: this.movie! }));
        } else {
          this.store.dispatch(MoviesActions.addMovieToFavorites({ movie: this.movie! }));
        }
      });
    }
  }


}
