import { Component, EventEmitter, Output } from '@angular/core';
import { movie } from '../../model/movie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() exportNameOfCategory = new EventEmitter<{ nameOfCategory: string }>();

  constructor() {

  }

  changeCategory(nameOfCategory: string) {
    this.exportNameOfCategory.emit({ nameOfCategory });
  }
}
