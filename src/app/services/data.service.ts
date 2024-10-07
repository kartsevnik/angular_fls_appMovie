import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { movieDB, moviesResponse } from '../models/api-movie-db';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { apiKeys } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // accountId: number | null = null;
  private moviesSearchSubject = new BehaviorSubject<movieDB[]>([])
  moviesSearch$ = this.moviesSearchSubject.asObservable()

  // moveiAPI connection settings 
  apiBaseURL = apiKeys.apiBaseURL
  apiKey = apiKeys.apiKey
  apiToken = apiKeys.apiToken

  constructor(private HttpClient: HttpClient, private firestore: AngularFirestore, private authService: AuthService, private router: Router
  ) { }

  // setAccountId(id: number) {
  //   this.accountId = id;
  // }

  // getAccountId() {
  //   return this.accountId;
  // }

  getAllGenres(): Observable<any> {
    const url = `${this.apiBaseURL}/genre/movie/list?language=en`; // Убедитесь, что URL правильный
    const headers = {
      'Authorization': `Bearer ${this.apiToken}`, // Токен должен быть корректным
      'Accept': 'application/json' // Используйте правильный header
    };
    return this.HttpClient.get<any>(url, { headers });
  }

  //get Movies From API
  getMoviesTrending(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/trending/movie/day${this.apiKey}&page=${page}`);
  }

  getMoviesNowPlaying(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/movie/now_playing${this.apiKey}&page=${page}`);
  }

  getMoviesPopular(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/movie/popular${this.apiKey}&page=${page}`);
  }

  getMoviesTopRated(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/movie/top_rated${this.apiKey}&page=${page}`);
  }

  getMoviesUpcoming(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/movie/upcoming${this.apiKey}&page=${page}`);
  }

  getSearchMovieObservable(searchText: string, include_adult: boolean, year: string, page: number = 1): Observable<movieDB[]> {
    const url = `${this.apiBaseURL}/search/movie`;
    const params = new HttpParams()
      .set('query', searchText)
      .set('include_adult', include_adult)
      .set('primary_release_year', year)
      .set('language', 'en-US')
      .set('page', page.toString())
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    });

    return this.HttpClient.get<any>(url, { headers, params }).pipe(
      map(response => response.results as movieDB[])
    );
  }

  getMovieTitles(searchText: string, include_adult: boolean, year: string, page: number = 1): Observable<string[]> {
    const url = `${this.apiBaseURL}/search/movie`;
    const params = new HttpParams()
      .set('query', searchText)
      .set('include_adult', include_adult)
      .set('primary_release_year', year)
      .set('language', 'en-US')
      .set('page', page.toString())
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiToken}`
    });

    return this.HttpClient.get<any>(url, { headers, params }).pipe(
      map(response => response.results.map((movie: any) => movie.title))
    );
  }

  // ==================================== Favorites

  // Сохранение фильма в избранное
  async addToFavorites(movie: any): Promise<void> {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (user) {
      const userId = user.uid;
      await this.firestore.collection('favorites').doc(userId).collection('movies').doc(movie.id.toString()).set(movie);
    } else {
      throw new Error('Пользователь не авторизован');
    }
  }
  // Удаление фильма из избранного
  async removeFromFavorites(movieId: number): Promise<void> {
    const user = await firstValueFrom(this.authService.getCurrentUser())
    if (user) {
      const userId = user.uid;
      return this.firestore.collection('favorites').doc(userId).collection('movies').doc(movieId.toString()).delete();
    } else {
      throw new Error('The user is not authorized');
    }
  }



  // Получение списка избранного
  getFavorites(): Observable<any[]> {
    if (!this.authService.isUserAuthenticated()) {
      // Пользователь не аутентифицирован, возвращаем пустой массив
      return of([]);
    }

    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.firestore.collection('favorites').doc(userId).collection('movies').valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  // ==================================== to watch

  // Сохранение фильма в избранное
  async addToWatchList(movie: any) {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (user) {
      const userId = user.uid;
      return this.firestore.collection('watchList').doc(userId).collection('movies').doc(movie.id.toString()).set(movie);
    } else {
      throw new Error('Пользователь не авторизован');
    }
  }

  // Удаление фильма из избранного
  async removeFromWatchList(movieId: number) {
    const user = await firstValueFrom(this.authService.getCurrentUser());
    if (user) {
      const userId = user.uid;
      return this.firestore.collection('watchList').doc(userId).collection('movies').doc(movieId.toString()).delete();
    } else {
      throw new Error('Пользователь не авторизован');
    }


  }

  // Получение списка избранного
  getWatchList(): Observable<any[]> {
    if (!this.authService.isUserAuthenticated()) {
      // Пользователь не аутентифицирован, возвращаем пустой массив
      return of([]);
    }

    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.firestore.collection('watchList').doc(userId).collection('movies').valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }
}


