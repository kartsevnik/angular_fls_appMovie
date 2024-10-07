import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../store/state';
import { map, take } from 'rxjs/operators';
import * as MoviesActions from '../../store/actions';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
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

  visiblePopUpLogin: boolean = false;

  constructor(private store: Store<AppState>, private dataHandler: DataHandlerService, private dataService: DataService, private authService: AuthService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
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
    if (this.movie && this.authService.isUserAuthenticated()) {
      this.isFavorite$ = this.dataService.getFavorites().pipe(
        map(favorites => favorites.some((favMovie: any) => favMovie.id === this.movie!.id))
      );

      this.isToWatch$ = this.dataService.getWatchList().pipe(
        map(watchlist => watchlist.some((watchMovie: any) => watchMovie.id === this.movie!.id))
      );
    } else {
      // Пользователь не аутентифицирован, устанавливаем значения по умолчанию
      this.isFavorite$ = of(false);
      this.isToWatch$ = of(false);
    }
  }

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

    if (!this.authService.isUserAuthenticated()) {
      this.showDialogPopUpLogin()
    } else {

      if (this.movie) {
        // Проверяем, добавлен ли фильм в избранное
        this.isToWatch$.pipe(take(1)).subscribe(isToWatch => {
          if (isToWatch) {
            // Если фильм в избранном, удаляем его из списка
            this.dataService.removeFromWatchList(this.movie!.id)
              .then(() => {
                console.log('Фильм удален из списка ToWatch');
                // Можно добавить дополнительную логику после удаления
              })
              .catch(error => {
                console.error('Ошибка удаления из списка ToWatch:', error);
              });
          } else {
            // Если фильм не в избранном, добавляем его
            this.dataService.addToWatchList(this.movie!)
              .then(() => {
                console.log('Фильм добавлен в список ToWatch');
                // Можно добавить дополнительную логику после добавления
              })
              .catch(error => {
                console.error('Ошибка добавления в список ToWatch:', error);
              });
          }
        });
      }
    }
  }


  toggleFavoritesList() {

    if (!this.authService.isUserAuthenticated()) {
      this.showDialogPopUpLogin()
    } else {
      if (this.movie) {
        // Проверяем, добавлен ли фильм в избранное
        this.isFavorite$.pipe(take(1)).subscribe(isInFavorites => {
          if (isInFavorites) {
            // Если фильм в избранном, удаляем его из списка
            this.dataService.removeFromFavorites(this.movie!.id)
              .then(() => {
                console.log('Фильм удален из избранного');
                // Можно добавить дополнительную логику после удаления
              })
              .catch(error => {
                console.error('Ошибка удаления из избранного:', error);
              });
          } else {
            // Если фильм не в избранном, добавляем его
            this.dataService.addToFavorites(this.movie!)
              .then(() => {
                console.log('Фильм добавлен в избранное');
                // Можно добавить дополнительную логику после добавления
              })
              .catch(error => {

                console.error('Ошибка добавления в избранное:', error);
              });
          }
        });
      }
    }
  }



  showDialogPopUpLogin() {
    this.visiblePopUpLogin = true;
  }

  closeModal() {
    this.visiblePopUpLogin = false;
  }

  goToPageLogin() {
    this.router.navigate([{ outlets: { login: ['login'] } }]);
  }

  goToPageRegister() {
    this.router.navigate([{ outlets: { login: ['registration'] } }]);
  }
}
