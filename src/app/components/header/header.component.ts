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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  lastScrollTop = 0;
  isHeaderHidden = false;
  isSearchVisible = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() wrapper!: HTMLElement;

  selectedCategory: string = '';
  filterText = '';

  private scrollListenerAdded = false;
  private subscriptions: Subscription = new Subscription();

  constructor(public dataHandlerService: DataHandlerService, public dataService: DataService, private router: Router, private store: Store<AppState>) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.dataHandlerService.shouldClearSearchInput) {
          this.clearSearchInput();
        }
      });
  }

  ngOnInit(): void {
    // Подписка только на изменения из Store, так как DataHandlerService теперь отправляет действия в Store
    const categorySubscription = this.store.pipe(
      select(selectSelectedCategory)
    ).subscribe(category => {
      this.selectedCategory = category;
      // console.log('Текущая категория из Store:', this.selectedCategory);
      // Дополнительная логика при изменении категории
    });

    this.subscriptions.add(categorySubscription);

    // Добавление слушателя прокрутки, если он ещё не добавлен
    if (!this.scrollListenerAdded && this.wrapper) {
      this.addScrollListener();
    }

    this.store.pipe(select(selectCurrentSearchQuery)).subscribe(query => {
      console.log('HeaderComponent - currentSearchQuery:', query);
      this.filterText = query;
    });
    console.log(this.filterText);

  }
  ngOnDestroy() {
    console.log('HeaderComponent destroyed');
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

      if (currentScroll > this.lastScrollTop) {
        this.isHeaderHidden = true;
      } else if (currentScroll < this.lastScrollTop) {
        this.isHeaderHidden = false;
      }

      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    } else {
      console.error('Wrapper is not defined during scroll event.');
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

  test: string = ''

  search(searchText: string) {
    if (searchText && searchText.trim() !== '') {
      this.test = searchText
      // Диспетчеризуем обновление поискового запроса
      this.store.dispatch(MoviesActions.updateSearchQuery({ query: searchText }));

      // Диспетчеризуем поиск фильмов
      this.store.dispatch(MoviesActions.searchMovies({ query: searchText, page: 1 }));

      // Navigate to the search page
      this.router.navigate(['/search']);
    }
    this.filterText = searchText;
  }


  private clearSearchInput() {
    if (!this.router.url.includes('/search')) {
      if (this.searchInput && this.searchInput.nativeElement) {
        this.searchInput.nativeElement.value = '';
      }
    }
  }
}
