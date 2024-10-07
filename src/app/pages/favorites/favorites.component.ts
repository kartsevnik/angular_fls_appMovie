// Пример для компонента избранного
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.dataService.getFavorites().subscribe(movies => {
        this.favoriteMovies = movies;
      });
    } else {
      this.router.navigate([{ outlets: { login: ['login'] } }]);
    }
  }

  loadNextPage() {
  }
}
