import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.notificationService.showSuccess(`${product.name} added to cart!`);
  }
}
