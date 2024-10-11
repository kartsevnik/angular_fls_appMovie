import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/state';
import { loadGenres } from './store/actions';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Movie Pulse';
  isLoginRoute: boolean = false; //Булево значение, используемое для определения, находится ли пользователь на странице входа или регистрации.
  private routerSubscription!: Subscription;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {

    // метод для получения accountId из API TMDB
    // this.authService.authenticateAndGetAccountId().subscribe(
    //   accountId => {
    //     this.dataService.setAccountId(accountId);
    //     console.log('Account ID:', accountId);
    //   },
    //   error => {
    //     console.error('Authentication failed:', error);
    //   }
    // );

    this.store.dispatch(loadGenres());

    this.routerSubscription = this.router.events
      .pipe(
        //Здесь мы используем type predicate (event): event is NavigationEnd, чтобы явно указать TypeScript, 
        //что после этой фильтрации event является экземпляром NavigationEnd.
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Используем type predicate 
      )
      .subscribe(event => { // Теперь TypeScript знает, что event — NavigationEnd
        console.log(event);
        this.isLoginRoute = ['login', 'registration'].some(route => event.url.includes(route));
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe()
    }
  }

}
