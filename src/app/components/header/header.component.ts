import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { movie } from '../../models/movie';
import { DataHandlerService } from '../../services/data-handler.service';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  // переменная для отображения панели поиска
  isSearchVisible = false;

  // начальная переменная со списком категорий
  categoryList: Category[] = []
  selectedCategory: Category | undefined;
  
  // переменная для ngModel которая использует FormsModule для фильтрации
  filterText = ''

  // передача изменения в категориях
  // @Output() exportNameOfCategory = new EventEmitter<{ nameOfCategory: string }>();

  constructor(public dataHandlerService: DataHandlerService, private dataService: DataService) {
  }

  // при создании компонента загрузка списка категорий и выбор категории по умолчанию для загрузки
  ngOnInit(): void {
    this.categoryList = this.dataService.categoryList;
    this.dataHandlerService.changeCategory('Home');
    console.log(this.categoryList);

    // Add document click listener
    document.addEventListener('click', this.onDocumentClick.bind(this));

  }

  ngOnDestroy(): void {
    // Remove the document click listener to avoid memory leaks
    document.removeEventListener('click', this.onDocumentClick.bind(this));
  }


  //изменение отображения панели поиска
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  //изменение отображения панели поиска при клике в документе вне панели поиска
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

  // передача значения измененной категории
  changeCategory(nameOfCategory: string) {
    this.dataHandlerService.selectedCategory = nameOfCategory
    this.dataHandlerService.updateSelectedMovies(nameOfCategory)
  }
}
