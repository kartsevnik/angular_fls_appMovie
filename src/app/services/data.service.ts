import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movieDB, moviesResponse } from '../models/api-movie-db';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  accountId: number | null = null;

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
}

