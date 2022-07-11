import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
	baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public get(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/transactions/${id}`);
  }

  public getByCategoryId(categoryId: string, fromDate: string, toDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}/transactions/total-expense?fromDate=${fromDate}&toDate=${toDate}`);
  }

  public create(json: string): Observable<Transaction> {
  	return this.http.post<Transaction>(`${this.baseUrl}/transactions`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  public update(json: string): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/transactions`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/transactions?id=${id}`);
  }
}
