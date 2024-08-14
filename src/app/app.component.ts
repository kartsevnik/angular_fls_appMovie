import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'movie-project';

  selectedCategory = 'All Movies';  // default category

  onCategoryChange(event: { nameOfCategory: string }) {
    this.selectedCategory = event.nameOfCategory;
  }
}
