import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss'
})
export class WatchListComponent {
  toWatchListMovies: any[] = [];

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.dataService.getWatchList().subscribe(movies => {
        this.toWatchListMovies = movies;
      });
    } else {
      this.router.navigate([{ outlets: { login: ['login'] } }]);
    }
  }

  loadNextPage() {
  }
}
