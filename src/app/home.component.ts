import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search/search-bar.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchBarComponent,
    DynamicDialogModule,
    ImageModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService],
})
export class HomeComponent {
  title = 'eCommerse';
  path = `assets/products/logo.jpg`;

  constructor(private dialogService: DialogService) {}

  onClickCart() {
    this.dialogService.open(ShoppingCartComponent, {
      width: '50%',
      height: '50%',
      header: 'shoppingCart',
      modal: true,
    });
    //
  }

  onClickUser() {
    //
  }
}
