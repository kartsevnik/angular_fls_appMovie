import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { movieDB, moviesResponse } from '../models/api-movie-db';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  accountId: number | null = null;
  private moviesSearchSubject = new BehaviorSubject<movieDB[]>([])
  moviesSearch$ = this.moviesSearchSubject.asObservable()

  // moveiAPI connection settings 
  apiBaseURL = 'https://api.themoviedb.org/3'
  apiKey = '?api_key=fd8429ffaad200356d0b20c56812f7e5'
  apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDg0MjlmZmFhZDIwMDM1NmQwYjIwYzU2ODEyZjdlNSIsIm5iZiI6MTcyNDE2MDU0MC44MjYsInN1YiI6IjY2YzM1NjZhMTVlMzIzZjQ4OGEyOGNiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EocVzPT_kLDOwV-lNfCGHUhsmJNTt74zlJ_tICcAqqA'

  constructor(private HttpClient: HttpClient, private firestore: AngularFirestore, private authService: AuthService
  ) { }

  setAccountId(id: number) {
    this.accountId = id;
  }

  getAccountId() {
    return this.accountId;
  }

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

  // Сохранение фильма в избранное
  addToFavorites(movie: any) {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.firestore.collection('favorites').doc(userId).collection('movies').doc(movie.id.toString()).set(movie);
        } else {
          throw new Error('Пользователь не авторизован');
        }
      })
    ).toPromise();
  }

  // Удаление фильма из избранного
  removeFromFavorites(movieId: number) {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.firestore.collection('favorites').doc(userId).collection('movies').doc(movieId.toString()).delete();
        } else {
          throw new Error('Пользователь не авторизован');
        }
      })
    ).toPromise();
  }

  // Получение списка избранного
  getFavorites(): Observable<any[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.firestore.collection('favorites').doc(userId).collection('movies').valueChanges();
        } else {
          throw new Error('Пользователь не авторизован');
        }
      })
    );
  }
}


