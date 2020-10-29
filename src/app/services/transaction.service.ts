import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
	baseUrl = "https://localhost:44339";

  constructor(private http: HttpClient) {

  }

  get() {
    return this.http.get(`${this.baseUrl}/accounts`);
  }

  getById(id: string) {
    return this.http.get(`${this.baseUrl}/accounts/${id}`);
  }

  create(json: string) {
  	return this.http.post(`${this.baseUrl}/transactions`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
