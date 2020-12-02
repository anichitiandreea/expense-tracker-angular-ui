import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl = "https://localhost:44339"

  constructor(private http: HttpClient) { }

  get() {
		return this.http.get(`${this.baseUrl}/currencies`);
  }

  getById(id: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/currencies/${id}`);
  }

  exchangeToRON(): Observable<any> {
  	return this.http.get(`https://api.exchangeratesapi.io/latest?base=RON`);
  }
}
