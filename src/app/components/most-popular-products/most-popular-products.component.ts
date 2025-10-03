import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-most-popular-products',
  templateUrl: './most-popular-products.component.html',
  styleUrls: ['./most-popular-products.component.scss']
})
export class MostPopularProductsComponent implements OnInit {

  popularProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      // For this prototype, we'll feature the first 3 products as "popular"
      this.popularProducts = products.slice(0, 3);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Added to cart!'); // Replace with a more sophisticated notification
  }
}