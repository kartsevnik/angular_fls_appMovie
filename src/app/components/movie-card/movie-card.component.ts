import { Component, EventEmitter, Input, Output } from '@angular/core';
import { movie } from '../../models/movie';
import { TrasformTimeDuration } from '../../pipes/trasformTimeDuration.pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() movie: movie | undefined;
  @Output() addWatchList = new EventEmitter<{ movie: movie, action: 'add' | 'remove' }>();
  @Output() addFavoritesList = new EventEmitter<{ movie: movie, action: 'add' | 'remove' }>();

  visible: boolean = false;
  selectedMovie: Partial<movie> | null = null;
  
  constructor() { }

  showDialog() {
    if (this.movie) {
      this.selectedMovie = {
        id: this.movie.id,
        title: this.movie.title,
        year: this.movie.year,
        duration: this.movie.duration,
        imgPath: this.movie.imgPath,
        favorite: this.movie.favorite,
        toWatch: this.movie.toWatch,
        rating: this.movie.rating,
        description: this.movie.description,
        quality: this.movie.quality,
        genres: this.movie.genres,
        imgLargePath: this.movie.imgLargePath
      };
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
