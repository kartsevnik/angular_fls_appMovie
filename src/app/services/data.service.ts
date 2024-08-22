import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movieDB, moviesResponse } from '../models/api-movie-db';
import { categoryList } from '../mock-data/mock-data';
import { favoriteMovies } from '../mock-data/mock-data';
import { toWatchMovies } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  accountId: number | null = null;



  // moveiAPI connection settings 
  apiBaseURL = 'https://api.themoviedb.org/3/movie'
  apiKey = '?api_key=fd8429ffaad200356d0b20c56812f7e5'
  apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDg0MjlmZmFhZDIwMDM1NmQwYjIwYzU2ODEyZjdlNSIsIm5iZiI6MTcyNDE2MDU0MC44MjYsInN1YiI6IjY2YzM1NjZhMTVlMzIzZjQ4OGEyOGNiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EocVzPT_kLDOwV-lNfCGHUhsmJNTt74zlJ_tICcAqqA'

  constructor(private HttpClient: HttpClient) { }

  setAccountId(id: number) {
    this.accountId = id;
  }

  // Get a list of all categories
  getCategoryList() {
    return categoryList;
  }

  // Get a list of all films
  // getMovies(): movieDB[] {
  //   return [];
  // }

  // =================> Favorites

  getFavoriteMovies(): movieDB[] {
    return favoriteMovies;
  }

  addMovieToFavorites(movie: movieDB) {
    favoriteMovies.push(movie);
  }

  removeMovieFromFavorites(movie: movieDB) {
    const index = favoriteMovies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    }
  }

  // =================> ToWatch

  getToWatchMovies(): movieDB[] {
    return toWatchMovies;
  }

  addMovieToWatchlist(movie: movieDB) {
    toWatchMovies.push(movie);
  }

  removeMovieFromWatchlist(movie: movieDB) {
    const index = toWatchMovies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      toWatchMovies.splice(index, 1);
    }
  }

  // =================> detail view

  // getMovieById(id: number): movieDB | undefined {
  //   return this.getMovies().find(movie => movie.id === id);
  // }

  // =================> get movies for all pages
  getMoviesTrending(page: number = 1): Observable<moviesResponse> {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    };
    return this.HttpClient.get<moviesResponse>(url, { headers });
  }

  getMoviesNowPlaying(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/now_playing${this.apiKey}&page=${page}`);
  }

  getMoviesPopular(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/popular${this.apiKey}&page=${page}`);
  }

  getMoviesTopRated(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/top_rated${this.apiKey}&page=${page}`);
  }

  getMoviesUpcoming(page: number = 1): Observable<moviesResponse> {
    return this.HttpClient.get<moviesResponse>(`${this.apiBaseURL}/upcoming${this.apiKey}&page=${page}`);
  }
}

