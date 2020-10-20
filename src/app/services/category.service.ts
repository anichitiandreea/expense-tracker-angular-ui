import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = "https://localhost:44339"

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  create(json: string) {
  	return this.http.post(`${this.baseUrl}/categories`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
