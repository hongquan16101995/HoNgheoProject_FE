import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from './role';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${API_URL}/api/roles`);
  }
}
