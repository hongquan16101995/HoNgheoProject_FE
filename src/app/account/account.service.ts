import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SignUp} from './sign-up';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import {LoginRequest} from './login-request';
import {LoginResponse} from './login-response';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentUser: Observable<LoginResponse>;
  public currentUserSubject: BehaviorSubject<LoginResponse>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(signUp: SignUp): Observable<User> {
    return this.http.post<User>(`${API_URL}/api/register`, signUp);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${API_URL}/api/login`, loginRequest).pipe(map(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }
}
