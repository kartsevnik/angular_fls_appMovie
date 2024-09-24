import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { movieDB } from '../../models/api-movie-db';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../../services/data-handler.service';
import { AppState } from '../../store/state'; // Убедитесь, что путь корректен
import { selectFavoriteMovies, selectToWatchMovies } from '../../store/selectors'; // Убедитесь, что путь корректен
import { Observable } from 'rxjs';


@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrl: './saved-movies.component.scss'
})
export class SavedMoviesComponent {
  savedMovies$!: Observable<movieDB[]>;
  
  nameOfCategory: string = ''
  isLoading = false; 
  
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private dataHandlerService: DataHandlerService
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    // We get a parameter from ActivatedRoute
    this.activatedRoute.url.subscribe(urlSegments => {
      const category = urlSegments[0]?.path;

      if (category) {
        if (category === 'favorites') {
          this.dataHandlerService.changeCategory("Favorites"); 
          this.nameOfCategory = "favorites"
          this.savedMovies$ = this.store.select(selectFavoriteMovies);
        } else if (category === 'watch-list') {
          this.dataHandlerService.changeCategory("Watch list"); 
          this.nameOfCategory = "watch"
          this.savedMovies$ = this.store.select(selectToWatchMovies);
        }
      }
    });
  }

  loadNextPage() {
 // plug, since there is no pagination for the chosen ones and the list for viewing
  }

}
