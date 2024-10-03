import { Component, OnInit,  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { loadGenres } from './store/actions';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Movie Pulse';
  // selectedCategory = 'All Movies';  
  isLoginRoute: boolean = false;

  constructor(private dataService: DataService, private authService: AuthService, private store: Store<AppState>, private router: Router) { }

  // onCategoryChange(event: { nameOfCategory: string }) {
  //   this.selectedCategory = event.nameOfCategory;
  // }

  ngOnInit() {
    this.authService.authenticateAndGetAccountId().subscribe(
      accountId => {
        this.dataService.setAccountId(accountId);
        console.log('Account ID:', accountId);
      },
      error => {
        console.error('Authentication failed:', error);
      }
    );
    this.store.dispatch(loadGenres());

    // Подписка на события роутинга
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      // Проверка маршрута
      this.isLoginRoute = ['login', 'registration'].some(route => event.url.includes(route));
    });

  }

}
