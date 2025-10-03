import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartItemCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // Check login status on init and whenever the route changes (or a more reactive way)
    this.isLoggedIn = this.authService.isLoggedIn();
    // A more robust way would be to subscribe to an observable from AuthService
    // For now, we'll rely on checking on init and after logout
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
