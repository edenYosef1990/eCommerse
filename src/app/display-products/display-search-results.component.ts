import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { catchError, filter, map, switchMap, tap } from 'rxjs';
import { StoreApiService } from '../store-api.service';
import { ProductsListComponent } from './products-list';

@Component({
  selector: 'app-display-search-results',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsListComponent],
  template: `search results for {{ (id$ | async) ?? '' }}
    <app-products-list [products]="(products$ | async)!" /> `,
  styleUrls: ['./display-search-results.component.scss'],
})
export class DisplaySearchResultsComponent {
  id$ = this.activatedRoutes.paramMap.pipe(map((x) => x.get('id')));

  products$ = this.id$.pipe(
    filter(Boolean),
    map((x) => this.storeApi.getProducts(x)),
    switchMap((x) =>
      x.pipe(
        catchError((msg) => {
          throw `error. details: ${msg}`;
        })
      )
    ),
    map((x) =>
      x.map((x) => ({
        ...x,
        imagePath: `assets/products/${x.imagePath}`,
      }))
    )
  );

  constructor(
    private activatedRoutes: ActivatedRoute,
    private storeApi: StoreApiService
  ) {
    this.products$.subscribe((x) => console.log(x));
  }
}
