import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StoreApiService } from '../store-api.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BreakTextToLinesPipe } from '../pipes/break-text-to-lines.pipe';
import { ButtonModule } from 'primeng/button';
import { ShoppingCartService } from '../store-state.service';

@Component({
  selector: 'all-products-list-item-summary-component',
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
          width="250"
          [preview]="true"
        />
        <div class="description">
          {{ item.name | limitBeforeBreak : 80 }}
          <p-rating [(ngModel)]="value" />
          <p-button label="Purchase" (click)="onClickPurchase()" />
        </div>
      </div>
    </p-card>
  `,
  standalone: true,
})
export class ProductsListItemSummaryComponent {
  @Input() item!: { name: string; imagePath: string; id: string };

  constructor(private service: ShoppingCartService) {}

  onClickPurchase() {
    this.service.addToShoppingCart(this.item.id);
  }

  value = 3.5;
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductsListItemSummaryComponent,
    CommonModule,
    RouterOutlet,
    DataViewModule,
    TagModule,
    RatingModule,
    FormsModule,
    NgFor,
  ],
  template: `
    <p-dataView #dv [value]="products">
      <ng-template pTemplate="list" let-products>
        <div *ngFor="let item of products; let first = first">
          <all-products-list-item-summary-component [item]="item" />
        </div>
      </ng-template>
    </p-dataView>
  `,
  styleUrls: ['./display-search-results.component.scss'],
})
export class ProductsListComponent {
  @Input() products!: { name: string; imagePath: string }[];
  constructor(private storeApi: StoreApiService) {}
}
