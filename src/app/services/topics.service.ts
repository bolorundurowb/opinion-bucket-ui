import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class TopicsService {
  constructor(private http: HttpClient) {}

  getAll(limit: number, offset: number): Observable<any> {
    if (limit && offset) {
      return this.http.get(`${environment.apiUrl}topics?limit=${limit}&offset=${offset}&order=date`);
    } else {
      return this.http.get(`${environment.apiUrl}topics`);
    }
  }
}
