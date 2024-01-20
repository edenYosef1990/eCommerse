import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-display-all-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `all products`,
  styleUrls: ['./display-search-results.component.scss'],
})
export class DisplayAllProductsComponent {}
