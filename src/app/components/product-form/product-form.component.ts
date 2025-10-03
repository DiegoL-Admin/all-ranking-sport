import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
  };
  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productService.getProduct(+id).subscribe({
          next: (product) => {
            this.product = product;
          },
          error: (err) => {
            this.notificationService.showError('Failed to load product for editing: ' + (err.error.message || err.message));
            this.router.navigate(['/products']);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id!, this.product).subscribe({
        next: (res) => {
          this.notificationService.showSuccess('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.notificationService.showError('Failed to update product: ' + (err.error.message || err.message));
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: (res) => {
          this.notificationService.showSuccess('Product created successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.notificationService.showError('Failed to create product: ' + (err.error.message || err.message));
        }
      });
    }
  }
}
