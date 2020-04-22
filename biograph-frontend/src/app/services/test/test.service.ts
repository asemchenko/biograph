import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../../../api-urls';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ServerResponse} from '../../models/ServerResponse';


/**
 * TODO asem remove in prod
 * For testing purposes only
 */
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) {
  }

  getHomeGreeting(): Observable<string> {
    return this.httpClient.get(API_URLS.TEST_URL)
      .pipe(
        map((r: ServerResponse) => r.data),
        catchError(err => {
          return of('You are not authenticated');
        })
      );
  }
}
