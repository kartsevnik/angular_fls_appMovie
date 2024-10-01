import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchQuerySubject = new BehaviorSubject<string>('')
  searchQuery$ = this.searchQuerySubject.asObservable()

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query)
  }

  getCurrentSearchQuery() {
    return this.searchQuerySubject.value
  }
}
