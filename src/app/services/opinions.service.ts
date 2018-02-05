import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class OpinionsService {
  constructor(
    private http: HttpClient
  ) {}

  getOpinion(topicId: string, opinionId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}topics/${topicId}/opinions/${opinionId}`);
  }

  getAllOpinions(topicId: string): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}topics/${topicId}/opinions`);
  }

  likeOpinion(topicId: string, opinionId: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}topics/${topicId}/opinions/${opinionId}/like`, {});
  }

  unlikeOpinion(topicId: string, opinionId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}topics/${topicId}/opinions/${opinionId}/like`);
  }

  dislikeOpinion(topicId: string, opinionId: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}topics/${topicId}/opinions/${opinionId}/dislike`, {});
  }

  unDislikeOpinion(topicId: string, opinionId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}topics/${topicId}/opinions/${opinionId}/dislike`);
  }


}
