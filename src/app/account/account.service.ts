import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SignUp} from './sign-up';
import {Observable} from 'rxjs';
import {User} from './user';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  register(signUp: SignUp): Observable<User> {
    return this.http.post<User>(`${API_URL}/api/register`, signUp);
  }
}
