import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoreApiService } from '../store-api.service';
import { BehaviorSubject, Observable, catchError, map, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  template: `
    <input list="suggestions" [(ngModel)]="userInput" (input)="enterInput()" />
    <datalist *ngIf="userInput.length > 0" id="suggestions">
      <option *ngFor="let option of (suggestions | async)!">
        {{ option }}
      </option>
    </datalist>
  `,
})
export class SearchBarComponent {
  title = 'eCommerse';
  userInput = '';
  suggestions = this.searchService.suggestionsForPrefix$;
  constructor(public searchService: SearchService) {}

  enterInput() {
    this.searchService.enterInput(this.userInput);
  }
}
