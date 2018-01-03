import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: {username: string, password: string}): Observable<any> {
    return this.http.post('', payload);
  }
}
