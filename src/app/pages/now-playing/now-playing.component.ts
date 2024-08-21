import { Component, OnInit } from '@angular/core';
import { movieDB } from '../../models/api-movie-db';
import { DataService } from '../../services/data.service';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss'
})
export class NowPlayingComponent implements OnInit {

  nowPlayingMovies: movieDB[] = []
  currentPage = 1;
  isLoading = false;  // Флаг для предотвращения множественных запросов одновременно

  constructor(private dataService: DataService, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.changeCategory('Now Playing');
    this.loadMovies();
  }


  loadMovies() {
    if (this.isLoading) return;  // Если уже идет загрузка, ничего не делаем
    this.isLoading = true;

    this.dataService.getMoviesNowPlaying(this.currentPage).subscribe(movies => {
      this.nowPlayingMovies = [...this.nowPlayingMovies, ...movies.results];
      this.isLoading = false;
      console.log(this.nowPlayingMovies);
    }, () => {
      this.isLoading = false;
    });
  }

  loadNextPage() {
    this.currentPage++;
    this.loadMovies();
  }
}
