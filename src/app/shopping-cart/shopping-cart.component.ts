import { Component, Input } from '@angular/core';
import { ShoppingCartService } from './shopping-car.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BreakTextToLinesPipe } from '../pipes/break-text-to-lines.pipe';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

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
        grid-template-columns: 1fr 4fr;
        grid-template-areas: 'image description';
      }

      .image {
        grid-area: image;
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
      </div>
    </p-card>
  `,
  standalone: true,
})
export class ShoppingCardItemSummaryComponent {
  @Input() item!: { name: string; imagePath: string; id: string };

  constructor(private service: ShoppingCartService) {}

  onClickPurchase() {
    this.service.addToShoppingCart(this.item.id);
  }

  value = 3.5;
}

@Component({
  imports: [CommonModule, AsyncPipe, ShoppingCardItemSummaryComponent],
  standalone: true,
  template: `
    list of items:
    <div *ngFor="let item of products$ | async">
      <shopping-cart-item-summary-component [item]="item" />
    </div>
  `,
})
export class ShoppingCartComponent {
  products$ = this.service.pullProductsListInCart();

  constructor(private service: ShoppingCartService) {}
}
