import { Routes } from '@angular/router';
import { DisplaySearchResultsComponent } from './display-products/display-search-results.component';
import { DisplayAllProductsComponent } from './display-products/display-all-products.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'display-search-results/:id',
    component: DisplaySearchResultsComponent,
    outlet: 'products',
  },
  {
    path: '',
    component: DisplayAllProductsComponent,
    outlet: 'products',
  },
];
