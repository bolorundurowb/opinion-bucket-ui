import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(limit: number, offset: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}categories`);
  }
}
