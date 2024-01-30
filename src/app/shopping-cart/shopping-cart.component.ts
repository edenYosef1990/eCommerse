import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../store-state.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BreakTextToLinesPipe } from '../pipes/break-text-to-lines.pipe';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { map, tap } from 'rxjs';
import { ShoppingCartFacadeService } from './shopping-cart-facade.service';

@Component({
  selector: 'shopping-cart-item-summary-component',
  imports: [
    CardModule,
    ImageModule,
    BreakTextToLinesPipe,
    RatingModule,
    FormsModule,
    ButtonModule,
  ],
  template: `
    <style>
      .product-card {
        margin: 20px;
        width: 50px;
        background-color: yellow;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr 6fr 1fr;
        grid-template-areas: 'image description cancel';
      }

      .image {
        grid-area: image;
      }

      .cancel {
        grid-area: cancel;
      }

      .description {
        display: grid;
        font-weight: bold;
        white-space: pre-line;
        grid-area: description;
      }
    </style>

    <p-card class="product-card" [style]="{ width: '50%' }">
      <div class="container">
        <p-image
          class="image"
          [src]="item.imagePath"
          [alt]="item.name"
          width="50"
          [preview]="true"
        />
        <div class="description">
          {{ item.name }}
        </div>

        <button
          class="icon-only-button"
          (click)="onClickCancel()"
          style="margin: 0.5rem"
        >
          <i class="pi pi-times-circle" style="font-size: 2.5rem"></i>
        </button>
      </div>
    </p-card>
  `,
  standalone: true,
})
export class ShoppingCardItemSummaryComponent {
  @Input() item!: { name: string; imagePath: string; id: string };
  value = 3.5;

  constructor(public service: ShoppingCartFacadeService) {}

  onClickCancel() {
    this.service.removeFromShoppingCart(this.item.id);
  }
}

@Component({
  imports: [
    CommonModule,
    AsyncPipe,
    ShoppingCardItemSummaryComponent,
    ButtonModule,
  ],
  providers: [ShoppingCartFacadeService],
  standalone: true,
  template: `
    <div *ngIf="service.products$ | async as products">
      <div *ngIf="products.length > 0; else noItemsInCart">
        <div *ngFor="let item of products">
          list of items:
          <shopping-cart-item-summary-component [item]="item" />
        </div>
        <p-button label="Purchase" (click)="onClickPurchase()" />
      </div>
      <ng-template #noItemsInCart> No Items In Cart </ng-template>
    </div>
  `,
})
export class ShoppingCartComponent {
  constructor(public service: ShoppingCartFacadeService) {}

  onClickPurchase() {
    this.service.buyAllItemsInCart();
  }
}
