import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Currency } from '../model/currency';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public get(): Observable<Currency[]> {
		return this.http.get<Currency[]>(`${this.baseUrl}/currencies`);
  }

  public getById(id: string): Observable<Currency> {
		return this.http.get<Currency>(`${this.baseUrl}/currencies/${id}`);
  }
}
