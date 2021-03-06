import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  userKey = 'ob-user';
  userTokenKey = 'ob-token';

  constructor(private http: HttpClient) {}

  login(payload: {username: string, password: string}): Observable<any> {
    return this.http.post(`${environment.apiUrl}signIn`, payload);
  }

  register(payload: {username: string, password: string, passwordAgain: string, email: string}): Observable<any> {
    return this.http.post(`${environment.apiUrl}signUp`, payload);
  }

  saveUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  saveToken(token: string): void {
    localStorage.setItem(this.userTokenKey, token);
  }

  retrieveUser(): any {
    const retrievedObject = localStorage.getItem(this.userKey);
    return JSON.parse(retrievedObject);
  }

  retrieveToken(): string {
    return localStorage.getItem(this.userTokenKey);
  }

  clearData(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    if (this.retrieveToken()) {
      return true;
    }
    return false;
  }
}
