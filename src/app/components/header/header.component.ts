import { Component, EventEmitter, Output } from '@angular/core';
import { movie } from '../../models/movie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoryList = [
    { name: "Home", key: 'Home' },
    { name: "All Movies", key: 'All Movies' },
    { name: "Favorites", key: 'Favorites' },
    { name: "To Watch", key: 'To Watch' },
  ]

  @Output() exportNameOfCategory = new EventEmitter<{ nameOfCategory: string }>();

  constructor() {

  }

  changeCategory(nameOfCategory: string) {
    this.exportNameOfCategory.emit({ nameOfCategory });
  }
}
