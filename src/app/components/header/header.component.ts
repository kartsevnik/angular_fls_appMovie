import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/state';
import { selectCurrentSearchQuery, selectSelectedCategory } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import * as MoviesActions from '../../store/actions';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser: any = undefined
  userMenu: any[] = [
    { label: 'Log Out', value: 'logout' }
  ];


  lastScrollTop = 0;
  isHeaderHidden = false;
  isSearchVisible = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() wrapper!: HTMLElement;
  selectedCategory: string = '';

  filterText = '';
  include_adult_chk: boolean = false
  year: Date | null = null
  filteredSuggestions: string[] = [];

  private scrollListenerAdded = false;
  private subscriptions: Subscription = new Subscription();

  constructor(public dataHandlerService: DataHandlerService, public dataService: DataService, private router: Router, private store: Store<AppState>, private authService: AuthService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.dataHandlerService.shouldClearSearchInput) {
          this.clearSearchInput();
        }
      });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        // console.log('User Name:', user.email);
      } else {
        // Если пользователь не авторизован
        this.currentUser = null;
      }
    });


    // Подписка на изменения выбранной категории из Store
    const categorySubscription = this.store.pipe(
      select(selectSelectedCategory)
    ).subscribe(category => {
      this.selectedCategory = category;
    });

    this.subscriptions.add(categorySubscription);

    // Добавление слушателя прокрутки
    if (!this.scrollListenerAdded && this.wrapper) {
      this.addScrollListener();
    }

    // Подписка на текущий поисковый запрос
    this.store
      .pipe(select(selectCurrentSearchQuery))
      .subscribe(query => {
        console.log('HeaderComponent - currentSearchQuery:', query);
        this.filterText = query;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  addScrollListener(): void {
    if (this.wrapper) {
      this.wrapper.addEventListener('scroll', this.onWindowScroll.bind(this));
      console.log('Scroll listener added to wrapper');
      this.scrollListenerAdded = true;
    } else {
      console.error('Wrapper is not defined.');
    }
  }

  onWindowScroll() {
    if (this.wrapper) {
      const currentScroll = this.wrapper.scrollTop;
      this.isHeaderHidden = currentScroll > this.lastScrollTop;
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInside = clickedElement.closest('.search-input') !== null || clickedElement.closest('.ramka-3') !== null;

    if (!isClickInside) {
      this.isSearchVisible = false;
    }
  }

  search(searchText: string) {
    if (searchText && searchText.trim() !== '') {
      const yearInString = this.year ? this.year.getFullYear().toString() : '';

      // Диспетчеризуем обновление поискового запроса
      this.store.dispatch(MoviesActions.updateSearchParams({
        query: searchText,
        include_adult: this.include_adult_chk,
        year: yearInString
      }));

      // Диспетчеризуем поиск фильмов
      this.store.dispatch(MoviesActions.searchMovies({ query: searchText, include_adult: this.include_adult_chk, year: yearInString, page: 1 }));

      // Navigate to the search page
      this.router.navigate(['/search']);
    }
    this.filterText = searchText;
  }

  clearSearchInput() {
    if (!this.router.url.includes('/search')) {
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = '';
      }
    }
  }

  clearFilters() {
    this.filterText = '';
    this.include_adult_chk = false;
    this.year = null;
    this.filteredSuggestions = [];
  }

  searchMovieTitles(event: any) {
    const query = event.query;
    const yearInString = this.year ? this.year.getFullYear().toString() : '';
    if (query && query.trim() !== '') {
      // Вызовите метод в DataService для получения предложений на основе запроса
      this.dataService.getMovieTitles(query, this.include_adult_chk, yearInString, 1).subscribe(suggestions => {
        this.filteredSuggestions = suggestions;
      });
    } else {
      // Если ввода нет, очистите список предложений
      this.filteredSuggestions = [];
    }
  }

  confirmLogout(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to Log Out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Confirmed',
          detail: 'You have been logged out of your account.',
          life: 3000
        });
        this.authService.logout().then(() => {
          this.currentUser = null; // Обновляем состояние текущего пользователя
          // this.router.navigate(['/']); 
          this.router.navigate(['/home']);
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You remained logged in.',
          life: 3000
        });
      }
    });
  }

}
