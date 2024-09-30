import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { loadGenres } from './store/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Movie Pulse';
  selectedCategory = 'All Movies';  // default category

  constructor(private dataService: DataService, private authService: AuthService, private store: Store<AppState>) { }

  onCategoryChange(event: { nameOfCategory: string }) {
    this.selectedCategory = event.nameOfCategory;
  }

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
  }

}
