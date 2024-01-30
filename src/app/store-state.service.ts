import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  take,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { ShoppingCartItem } from './models/shopping-cart-item';
import { StoreApiService } from './store-api.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private _itemsInCart$: BehaviorSubject<ShoppingCartItem[]> =
    new BehaviorSubject<ShoppingCartItem[]>([]);
  itemsInCart$: Observable<ShoppingCartItem[]> = this._itemsInCart$;

  constructor(private shopApi: StoreApiService) {}

  addToShoppingCart(productId: string) {
    let itemsInCart = this._itemsInCart$.getValue();
    if (itemsInCart.some((x) => x.productId === productId)) return;
    this._itemsInCart$.next([...itemsInCart, { productId }]);
  }

  removeFromShoppingCart(productId: string) {
    let itemsInCart = this._itemsInCart$.getValue();
    let indexInCartArray = itemsInCart.findIndex(
      (x) => x.productId === productId
    );
    if (indexInCartArray === -1) return;
    itemsInCart.splice(indexInCartArray, 1);
    this._itemsInCart$.next([...itemsInCart]);
  }

  buyAllItemsInCart() {
    let itemsInCart = this._itemsInCart$.getValue();

    return this.shopApi.purchaseItems(itemsInCart).pipe(
      tap(() => {
        this._itemsInCart$.next([]);
      }),
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error(err));
      })
    );
  }

  pullProductsListInCart() {
    return this.shopApi.getProducts().pipe(
      withLatestFrom(this._itemsInCart$),
      map(([products, productsIds]) => {
        return products.filter((product) =>
          productsIds.map((x) => x.productId).includes(product.id)
        );
      }),
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error(err));
      }),
      take(1)
    );
  }
}
