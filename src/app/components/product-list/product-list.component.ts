import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.notificationService.showSuccess(`${product.name} added to cart!`);
  }

  editProduct(id: number): void {
    this.router.navigate([`/products/edit/${id}`]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notificationService.showSuccess('Product deleted successfully!');
          this.loadProducts(); // Refresh the list
        },
        error: (err) => {
          this.notificationService.showError('Failed to delete product: ' + (err.error.message || err.message));
        }
      });
    }
  }
}
