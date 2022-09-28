import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`${API_URL}/transactions`);
  }
  findAllByWallet(walletId?: number): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`${API_URL}/transactions/wallet/${walletId}`);
  }
  findById(id?: number): Observable<Transaction> {
    return this.httpClient.get<Transaction>(`${API_URL}/transactions/${id}`);
  }
  create(walletId?: number, transaction?: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${API_URL}/transactions/${walletId}`, transaction);
  }
  update(id?: number, transaction?: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${API_URL}/transactions/${id}`, transaction);
  }
  delete(id?: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/transactions/${id}`);
  }
}
