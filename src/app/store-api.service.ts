import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  getSuggestions(prefix: string): Observable<string[]> {
    return of(['suggestion1', 'suggestion2', 'suggestion3']);
  }
}
