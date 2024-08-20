import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/category';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // переменная для отображения панели поиска
  isSearchVisible = false;

  // начальная переменная со списком категорий
  categoryList: Category[] = []
  selectedCategory: Category | undefined;

  // переменная для ngModel которая использует FormsModule для фильтрации
  filterText = ''

  constructor(public dataHandlerService: DataHandlerService, private dataService: DataService, private router: Router) {
    // Отслеживание изменения маршрута
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.dataHandlerService.shouldClearSearchInput) {
          this.clearSearchInput();
        }
      });
  }

  // при создании компонента загрузка списка категорий и выбор категории по умолчанию для загрузки
  ngOnInit(): void {
    // Add document click listener 
    // document.addEventListener('click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy(): void {
    // Remove the document click listener to avoid memory leaks
    // document.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  //изменение отображения панели поиска
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  //изменение отображения панели поиска при клике в документе вне панели поиска
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isClickInside = clickedElement.closest('.search-input') !== null || clickedElement.closest('.ramka-3') !== null;

    if (!isClickInside) {
      this.isSearchVisible = false;
    }
  }

  // вызов метода сервиса для поиска фильма
  search(searchText: string) {
    this.dataHandlerService.fillListByFind(searchText);
  }

  // Очистка поля ввода
  private clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }
}