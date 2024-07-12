import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { movie } from '../../models/movie';
import { DataHandlerService } from '../../services/data-handler.service';
import { DataService } from '../../services/data.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';

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

  constructor(public dataHandlerService: DataHandlerService, private dataService: DataService, private router: Router) {
  }

  // при создании компонента загрузка списка категорий и выбор категории по умолчанию для загрузки
  ngOnInit(): void {
    this.categoryList = this.dataService.categoryList;
    this.dataHandlerService.changeCategory('Home');

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
  // changeCategory(nameOfCategory: string) {
  //   console.log(nameOfCategory);

  //   // this.dataHandlerService.changeCategory(nameOfCategory);
  //   // this.router.navigate(['/movie-list']);
  //   this.dataHandlerService.selectedCategory = nameOfCategory
  //   this.dataHandlerService.updateSelectedMovies(nameOfCategory)
  //   if (nameOfCategory === 'All Movies') {
  //     this.dataHandlerService.forceUpdateCategory(nameOfCategory);
  //     this.dataHandlerService.changeCategory(nameOfCategory);
  //     this.router.navigate(['/movie-list']);
  //   } else if (nameOfCategory === 'Favorites' || nameOfCategory === 'To Watch') {
  //     this.router.navigate(['/movie-list']);
  //   } else {

  //   }
  // }

  changeCategory(nameOfCategory: string) {
    console.log(nameOfCategory);

    // Если категория уже выбрана, временно сбросьте ее, чтобы триггерить onChange
    if (this.selectedCategory && this.selectedCategory.code === nameOfCategory) {
      this.selectedCategory = undefined;
      setTimeout(() => {
        this.selectedCategory = this.categoryList.find(category => category.code === nameOfCategory);
        this.updateCategory(nameOfCategory);
      });
    } else {
      this.selectedCategory = this.categoryList.find(category => category.code === nameOfCategory);
      this.updateCategory(nameOfCategory);
    }

    switch (nameOfCategory) {
      case 'All Movies': this.router.navigate(['/movie-list']);
        break
      case 'Favorites': this.router.navigate(['/movie-list']);
        break
      case 'To Watch': this.router.navigate(['/movie-list']);
        break
      case 'Now playing': this.router.navigate(['/now-playing']);
        break
      case 'Popular': this.router.navigate(['/popular']);
        break
      case 'Top rate': this.router.navigate(['/top-rate']);
        break
      case 'Upcoming': this.router.navigate(['/upcoming']);
        break
    }

  }

  updateCategory(nameOfCategory: string) {
    this.dataHandlerService.changeCategory(nameOfCategory);
    console.log(`Category updated to: ${nameOfCategory}`);
  }
}
