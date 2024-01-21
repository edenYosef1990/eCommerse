import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import data from '../assets/products.json';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  getSuggestions(prefix: string): Observable<string[]> {
    return of(
      data.products.map((x) => x.name).filter((x) => x.startsWith(prefix))
    );
  }

  getProducts(
    search: string
  ): Observable<{ name: string; imagePath: string }[]> {
    return of(data.products.filter((x) => x.name.startsWith(search)));
  }
}
