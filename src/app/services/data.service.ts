import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { movieDB, moviesResponse } from '../models/api-movie-db';

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

  constructor(private HttpClient: HttpClient) { }

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

  getSearchMovie(searchText: string) {
    console.log(searchText);

    const url = `${this.apiBaseURL}/search/movie`;
    const params = {
      query: searchText,
      include_adult: 'false',
      language: 'en-US',
      page: '1'
    };
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.apiToken}` // Replace with your actual token
    });

    this.HttpClient.get(url, { headers, params })
      .subscribe({
        next: (json: any) =>
          this.moviesSearchSubject.next(json.results),
        error: (err: any) => console.error('error:', err)
      });
    console.log(this.moviesSearchSubject);

  }
}


