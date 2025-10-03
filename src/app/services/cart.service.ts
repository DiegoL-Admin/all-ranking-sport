import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.items);

  constructor() { }

  // TODO: Replace with backend API calls

  addToCart(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.cartSubject.next([...this.items]);
  }

  getItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  clearCart(): void {
    this.items = [];
    this.cartSubject.next([...this.items]);
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}