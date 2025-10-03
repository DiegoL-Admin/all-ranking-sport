import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$: Observable<CartItem[]>;
  total: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getItems();
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(items => {
      this.total = this.cartService.getTotal();
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}