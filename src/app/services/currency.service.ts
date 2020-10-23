import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl = "https://localhost:44339"

  constructor(private http: HttpClient) { }

  get() {
		return this.http.get(`${this.baseUrl}/currencies`);
  }

  getById(id: string) {
		return this.http.get(`${this.baseUrl}/currencies/${id}`);
  }
}
