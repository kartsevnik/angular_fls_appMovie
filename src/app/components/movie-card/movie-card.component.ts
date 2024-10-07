import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() movie: movieDB | undefined;
  isFavorite$!: Observable<boolean>;
  isToWatch$!: Observable<boolean>;

  genres: any[] = []

  visible: boolean = false; //Управляет видимостью модального окна с деталями фильма.
  selectedMovie: Partial<movieDB> | null = null; //Выбранный фильм для отображения в модальном окне.
  scrollPosition = 0; // to maintain the position of the scroll

  imageUrlPoster: string = ''; //URL изображения постера фильма
  imageUrlBackdrop: string = ''; //URL изображения заднего плана фильма.

  visiblePopUpLogin: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private dataHandler: DataHandlerService, private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.setImageUrl();
    this.initializeObservables();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie'] && this.movie) {
      // this.setImageUrl();
      this.initializeObservables();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setImageUrl() {
    if (this.movie) {
      this.imageUrlPoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      this.imageUrlBackdrop = `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
    }
  }

  initializeObservables() {
    // Используем combineLatest для отслеживания изменений аутентификации и фильма
    this.isFavorite$ = combineLatest([
      this.authService.getCurrentUser(),
      of(this.movie)
    ]).pipe(
      switchMap(([user, movie]) => {
        if (user && movie) {
          return this.dataService.getFavorites().pipe(
            map(favorites => favorites.some((favMovie: any) => favMovie.id === movie.id))
          );
        } else {
          return of(false);
        }
      }),
      takeUntil(this.destroy$)
    );

    this.isToWatch$ = combineLatest([
      this.authService.getCurrentUser(),
      of(this.movie)
    ]).pipe(
      switchMap(([user, movie]) => {
        if (user && movie) {
          return this.dataService.getWatchList().pipe(
            map(watchlist => watchlist.some((watchMovie: any) => watchMovie.id === movie.id))
          );
        } else {
          return of(false);
        }
      }),
      takeUntil(this.destroy$)
    );
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
    this.closeModal();
    this.router.navigate([{ outlets: { login: ['login'] } }]);
  }

  goToPageRegister() {
    this.closeModal();
    this.router.navigate([{ outlets: { login: ['registration'] } }]);
  }
}
