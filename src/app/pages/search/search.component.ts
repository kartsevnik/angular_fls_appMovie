import { Component, OnInit } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  movies: movieDB[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.moviesSearch$.subscribe((movies: movieDB[]) => {
      this.movies = movies;
      console.log('Movies:', movies);
    })
  }

  loadNextPage() {
  }

}
