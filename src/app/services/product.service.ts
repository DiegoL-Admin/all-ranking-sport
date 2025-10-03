import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Define the Product interface based on your backend DTO
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const PRODUCT_API = environment.backendUrl + '/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API);
  }
}