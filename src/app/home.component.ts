import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search/search-bar.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SearchBarComponent,
    DynamicDialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService],
})
export class HomeComponent {
  title = 'eCommerse';

  constructor(private dialogService: DialogService) {}

  onClickCart() {
    this.dialogService.open(ShoppingCartComponent, {
      header: 'shoppingCart',
      modal: true,
    });
    //
  }

  onClickUser() {
    //
  }
}
