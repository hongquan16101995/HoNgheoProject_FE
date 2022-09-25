import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpService} from '../../http.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) {}

  findAll(): Observable<Wallet[]> {
    return this.httpClient.get<Wallet[]>(`${API_URL}/wallets/user/${this.user.id}`);
  }
  findById(id?: number): Observable<Wallet> {
    return this.httpClient.get<Wallet>(`${API_URL}/wallets/${id}`);
  }
  create(wallet: Wallet): Observable<Wallet> {
    return this.httpClient.post<Wallet>(`${API_URL}/wallets/${this.user.id}`, wallet);
  }
  update(id?: number, wallet?: Wallet): Observable<Wallet> {
    return this.httpClient.put<Wallet>(`${API_URL}/wallets/${id}`, wallet);
  }
  delete(id?: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/wallets/${id}`);
  }
}
