import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../store-state.service';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartFacadeService {
  _products$: BehaviorSubject<
    { name: string; imagePath: string; id: string }[]
  > = new BehaviorSubject<{ name: string; imagePath: string; id: string }[]>(
    []
  );
  products$: Observable<{ name: string; imagePath: string; id: string }[]> =
    this._products$;

  constructor(private service: ShoppingCartService) {
    this.reloadUpdatedProductsList();
  }

  reloadUpdatedProductsList() {
    this.service
      .pullProductsListInCart()
      .pipe(
        map((x) =>
          x.map((x) => ({
            ...x,
            imagePath: `assets/products/${x.imagePath}`,
          }))
        ),
        tap((x) => this._products$.next(x)),
        take(1)
      )
      .subscribe();
  }

  addToShoppingCart(productId: string) {
    this.service.addToShoppingCart(productId);
    this.reloadUpdatedProductsList();
  }

  removeFromShoppingCart(productId: string) {
    this.service.removeFromShoppingCart(productId);
    this.reloadUpdatedProductsList();
  }

  buyAllItemsInCart() {
    this.service.buyAllItemsInCart();
  }
}
