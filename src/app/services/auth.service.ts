import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = environment.backendUrl + '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  // Helper methods for token management (basic implementation)
  public saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
