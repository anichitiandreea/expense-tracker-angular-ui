import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
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
  	return this.http.post(`${this.baseUrl}/accounts`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  update(json: string) {
  	return this.http.put(`${this.baseUrl}/accounts`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/accounts?id=${id}`);
  }
}
