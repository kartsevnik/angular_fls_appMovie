// Пример для компонента избранного
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFavorites().subscribe(movies => {
      this.favoriteMovies = movies;
    });
  }

  remove(movieId: number) {
    this.dataService.removeFromFavorites(movieId)
      .then(() => {
        console.log('Movie removed from favorites');
      })
      .catch(error => {
        console.error('Error removing movie:', error);
      });
  }

  loadNextPage() {
    // this.store.dispatch(MoviesActions.setSelectedCategory({ category: MovieCategory.Home }));
  }
}
