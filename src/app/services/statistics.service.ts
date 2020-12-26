import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  baseUrl = "https://localhost:44339"

  constructor(private http: HttpClient) { }

  get(fromDate: string, toDate: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/statistics/category-expense?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
