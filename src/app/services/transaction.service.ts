import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
	baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  get(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/${id}`);
  }

  getByCategoryId(categoryId: string, fromDate, toDate): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}/transactions/total-expense?fromDate=${fromDate}&toDate=${toDate}`);
  }

  create(json: string) {
  	return this.http.post(`${this.baseUrl}/transactions`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  update(json: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/transactions`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/transactions?id=${id}`);
  }
}
