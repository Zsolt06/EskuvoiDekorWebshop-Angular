import { Component, OnInit } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.loadCart().then(() => {
      this.cart = this.cartService.getCart();
    });
  }
}
