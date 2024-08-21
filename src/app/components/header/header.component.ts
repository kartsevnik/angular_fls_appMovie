import { Component, HostListener, ViewChild, ElementRef, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { Category } from '../../models/category';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  lastScrollTop = 0;
  // Это логическая переменная, которая используется для управления классом CSS в шаблоне компонента. Когда она true, к заголовку добавляется класс 
  isHeaderHidden = false;

  // переменная для отображения панели поиска
  isSearchVisible = false;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  // начальная переменная со списком категорий
  // categoryList: Category[] = []
  selectedCategory: string = '';

  // переменная для ngModel которая использует FormsModule для фильтрации
  filterText = ''

  constructor(public dataHandlerService: DataHandlerService, private router: Router) {
    // Отслеживание изменения маршрута
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.dataHandlerService.shouldClearSearchInput) {
          this.clearSearchInput();
        }
      });
  }

  ngOnInit(): void {
    // Подписка на изменения категории из сервиса
    this.dataHandlerService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    //Возвращает количество пикселей, на которое прокручена страница по вертикали.
    //Это свойство поддерживается большинством современных браузеров.

    // document.documentElement.scrollTop: Возвращает текущее значение вертикальной прокрутки. 
    // Используется в качестве резервного варианта для более старых браузеров.
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Скроллим вниз, прячем заголовок
      this.isHeaderHidden = true;
    } else {
      // Скроллим вверх, показываем заголовок
      this.isHeaderHidden = false;
    }

    // Если значение currentScroll меньше или равно 0 (например, если пользователь находится на самой верхней части страницы),
    // lastScrollTop устанавливается в 0, чтобы избежать возможных отрицательных значений, которые могут вызывать некорректное поведение.
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Не допускаем отрицательных значений
  }
}
