import { Injectable } from '@angular/core';
import { StoreApiService } from '../store-api.service';
import { BehaviorSubject, catchError, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private storeApi: StoreApiService, private router: Router) {}

  _input$: BehaviorSubject<string> = new BehaviorSubject('');
  suggestionsForPrefix$ = this._input$.pipe(
    map((x) => this.storeApi.getSuggestions(x)),
    switchMap((x) =>
      x.pipe(
        catchError((msg) => {
          throw `error. details: ${msg}`;
        })
      )
    )
  );

  searchAutoCompleteSuggestions(input: string) {
    this._input$.next(input);
  }

  search(input: string) {
    this.router.navigate([
      {
        outlets: {
          products: ['display-search-results', input],
        },
      },
    ]);
  }
}
