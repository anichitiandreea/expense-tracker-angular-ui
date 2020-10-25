import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
