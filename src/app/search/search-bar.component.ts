import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoreApiService } from '../store-api.service';
import { BehaviorSubject, Observable, catchError, map, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, AutoCompleteModule],
  template: `
    <p-autoComplete
      [(ngModel)]="userInput"
      [suggestions]="(suggestions | async) ?? []"
      (completeMethod)="searchAutoCompleteSuggestions()"
      (onSelect)="searchInput()"
    />
    <button
      class="icon-only-button"
      (click)="searchInput()"
      style="margin-left: 0.5rem"
    >
      <i class="pi pi-search"></i>
    </button>
  `,
})
export class SearchBarComponent {
  title = 'eCommerse';
  userInput = '';
  suggestions = this.searchService.suggestionsForPrefix$;
  constructor(public searchService: SearchService) {}

  searchAutoCompleteSuggestions() {
    this.searchService.searchAutoCompleteSuggestions(this.userInput);
  }

  searchInput() {
    this.searchService.search(this.userInput);
  }
}
