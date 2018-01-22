import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class TopicsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}topics`);
  }

  getByCategories(catId: string): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}topics?category=${catId}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}topics/${id}`);
  }
}
