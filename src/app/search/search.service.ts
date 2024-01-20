import { Injectable } from '@angular/core';
import { StoreApiService } from '../store-api.service';
import { BehaviorSubject, catchError, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private storeApi: StoreApiService) {}

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

  enterInput(input: string) {
    this._input$.next(input);
  }
}
