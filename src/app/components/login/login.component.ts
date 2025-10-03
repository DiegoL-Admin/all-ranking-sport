import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/products']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login({ username, password }).subscribe({
      next: data => {
        this.authService.saveToken(data.token);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.router.navigate(['/products']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed';
        this.isLoginFailed = true;
      }
    });
  }
}