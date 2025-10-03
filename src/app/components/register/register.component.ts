import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register({ username, email, password }).subscribe({
      next: data => {
        console.log(data);
        this.notificationService.showSuccess('Registration successful! Please login.');
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      error: err => {
        const errorMessage = err.error.message || 'Registration failed';
        this.notificationService.showError(errorMessage);
      }
    });
  }
}
