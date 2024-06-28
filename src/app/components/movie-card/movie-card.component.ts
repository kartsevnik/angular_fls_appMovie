import { Component, EventEmitter, Input, Output } from '@angular/core';
import { movie } from '../../models/movie';
import { TrasformTimeDuration } from '../../pipes/trasformTimeDuration.pipe';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  @Input() movie: movie | undefined;
  @Output() addWatchList = new EventEmitter<{ movie: movie, action: 'add' | 'remove' }>();
  @Output() addFavoritesList = new EventEmitter<{ movie: movie, action: 'add' | 'remove' }>();

  constructor() { }

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
