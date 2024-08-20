import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { movie } from '../../models/movie';
import { movieDB } from '../../models/api-movie-db';
import { TrasformTimeDuration } from '../../pipes/trasformTimeDuration.pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit, OnChanges {

  @Input() movie: movieDB | undefined;
  @Output() addWatchList = new EventEmitter<{ movie: movieDB, action: 'add' | 'remove' }>();
  @Output() addFavoritesList = new EventEmitter<{ movie: movieDB, action: 'add' | 'remove' }>();

  visible: boolean = false;
  selectedMovie: Partial<movieDB> | null = null;

  imageUrlPoster: string = '';
  imageUrlBackdrop: string = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.setImageUrl();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movie'] && this.movie) {
      this.setImageUrl();
    }
  }

  setImageUrl() {
    if (this.movie) {
      this.imageUrlPoster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
      this.imageUrlBackdrop = `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
    }
  }


  showDialog() {
    if (this.movie) {
      this.selectedMovie = this.movie;
      this.visible = true;
    }

  }

  toggleWatchList() {
    if (this.movie) {
      this.movie.toWatch = !this.movie.toWatch;
      const action = this.movie.toWatch ? 'add' : 'remove';
      this.addWatchList.emit({ movie: this.movie, action });
    }
  }

  toggleFavoritesList() {
    if (this.movie) {
      this.movie.favorite = !this.movie.favorite;
      const action = this.movie.favorite ? 'add' : 'remove';
      this.addFavoritesList.emit({ movie: this.movie, action });
    }
  }

}
