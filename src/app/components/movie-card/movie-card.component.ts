import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/state';
import { selectFavoriteMovies, selectToWatchMovies } from '../../store/selectors';
import { map, take } from 'rxjs/operators';
import * as MoviesActions from '../../store/actions';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit, OnChanges {

  @Input() movie: movieDB | undefined;
  // @Output() addWatchList = new EventEmitter<{ movie: movieDB, action: 'add' | 'remove' }>();
  // @Output() addFavoritesList = new EventEmitter<{ movie: movieDB, action: 'add' | 'remove' }>();

  isFavorite$!: Observable<boolean>;
  isToWatch$!: Observable<boolean>;

  visible: boolean = false;
  selectedMovie: Partial<movieDB> | null = null;
  scrollPosition = 0; // Для сохранения позиции скролла

  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  constructor(private store: Store<AppState>) {
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

  showDialog() {
    if (this.movie) {
      this.saveScrollPosition(); // Сохраняем позицию скролла перед открытием
      this.selectedMovie = this.movie;
      this.visible = true;
    }
  }

  hideDialog() {
    this.visible = false;
    this.restoreScrollPosition(); // Восстанавливаем позицию скролла после закрытия
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
