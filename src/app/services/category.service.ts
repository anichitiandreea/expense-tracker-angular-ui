import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  get2() {
    return this.http.post(`${this.baseUrl}/currencies`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  create(json: string) {
  	return this.http.post(`${this.baseUrl}/categories`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  update(json: string) {
    return this.http.put(`${this.baseUrl}/categories`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories?id=${id}`);
  }
}
