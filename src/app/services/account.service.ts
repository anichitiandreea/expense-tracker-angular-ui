import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Account } from '../model/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
	baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public get(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  public getById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${id}`);
  }

  public create(json: string): Observable<Account> {
  	return this.http.post<Account>(`${this.baseUrl}/accounts`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  public update(json: string): Observable<Account> {
  	return this.http.put<Account>(`${this.baseUrl}/accounts`, json, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  public delete(id: string): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/accounts?id=${id}`);
  }
}
