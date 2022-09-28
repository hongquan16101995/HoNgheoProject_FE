import { Injectable } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL}/categories/user/${this.user.id}`);
  }
  findAllByStatus(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL}/categories/user_active/${this.user.id}`);
  }
  findById(id?: number): Observable<Category> {
    return this.httpClient.get<Category>(`${API_URL}/categories/${id}`);
  }
  create(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${API_URL}/categories/${this.user.id}`, category);
  }
  update(id?: number, category?: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${API_URL}/categories/${id}`, category);
  }
  updateStatus(id: number, status: number) {
    return this.httpClient.get<Category>(`${API_URL}/categories/${id}/${status}`);
  }
  delete(id?: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/categories/${id}`);
  }
}
