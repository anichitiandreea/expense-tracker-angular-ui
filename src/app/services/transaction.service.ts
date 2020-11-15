import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
	baseUrl = "https://localhost:44339";

  constructor(private http: HttpClient) {

  }

  get(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/${id}`);
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
}
