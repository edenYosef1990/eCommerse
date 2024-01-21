import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { catchError, filter, map, switchMap } from 'rxjs';
import { StoreApiService } from '../store-api.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DataViewModule,
    TagModule,
    RatingModule,
    FormsModule,
  ],
  template: `
    <div class="card">
      <p-dataView #dv [value]="products">
        <ng-template pTemplate="list" let-products>
          <div *ngFor="let item of products; let first = first">
            <img [src]="item.imagePath" [alt]="item.name" />
          </div>
        </ng-template>
      </p-dataView>
    </div>
  `,
  styleUrls: ['./display-search-results.component.scss'],
})
export class ProductsListComponent {
  @Input() products!: { name: string; imagePath: string }[];
  constructor(private storeApi: StoreApiService) {}
}
