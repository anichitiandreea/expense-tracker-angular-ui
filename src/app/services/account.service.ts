import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  get(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  getById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${id}`);
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
