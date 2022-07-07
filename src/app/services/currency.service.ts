import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Currency } from '../model/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<Currency[]> {
		return this.http.get<Currency[]>(`${this.baseUrl}/currencies`);
  }

  getById(id: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/currencies/${id}`);
  }

  exchangeToRON(): Observable<any> {
  	return this.http.get(`https://api.exchangeratesapi.io/latest?base=RON`);
  }
}
