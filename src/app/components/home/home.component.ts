import { Component } from '@angular/core';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { DataHandlerService } from '../../services/data-handler.service';
import { ActivatedRoute } from '@angular/router';
import { movieDB } from '../../models/api-movie-db';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieForHomeBlock: movieDB | null = null;

  constructor(private dataHandlerService: DataHandlerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.dataHandlerService.changeCategory(category);
      this.movieForHomeBlock = this.selectedMovies[2];
    });
  }

  get selectedMovies() {
    return this.dataHandlerService.selectedMovies;
  }
}
