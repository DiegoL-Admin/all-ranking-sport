import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Define the Product interface based on your backend DTO
export interface Product {
  id?: number; // ID is optional for creation
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const PRODUCT_API = environment.backendUrl + '/api/products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${PRODUCT_API}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Product>(PRODUCT_API, product, { headers });
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Product>(`${PRODUCT_API}/${id}`, product, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    const token = localStorage.getItem('jwt_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${PRODUCT_API}/${id}`, { headers });
  }
}
