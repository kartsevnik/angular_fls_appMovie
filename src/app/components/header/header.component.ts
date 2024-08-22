import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(public dataHandlerService: DataHandlerService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.dataHandlerService.shouldClearSearchInput) {
          this.clearSearchInput();
        }
      });
  }

  ngOnInit(): void {
    this.dataHandlerService.selectedCategory$.subscribe(category => {
      this.selectedCategory = category;
    });
    if (!this.scrollListenerAdded && this.wrapper) {
      this.addScrollListener();
    }
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

  search(searchText: string) {
    this.dataHandlerService.fillListByFind(searchText);
  }

  private clearSearchInput() {
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }
}
