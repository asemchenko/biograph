import {Injectable} from '@angular/core';
import {Attribute} from '../../models/Attribute';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../../../api-urls';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {User} from '../../models/User';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  createNewAttribute(attribute: Attribute): Observable<Attribute> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map((user: User) => user.userId),
      mergeMap((userId: number): Observable<Attribute> => {
        const url = API_URLS.ATTRIBUTE_URL.replace('{userId}', userId.toString());
        console.log('Got url: ', url);
        return this.http.post<Attribute>(url, attribute).pipe(
          tap(response => {
            console.log('[attribute service] Got response: ', response);
          }),
          catchError((error) => {
            console.log('[attribute service] Got error: ', error);
            return of(null);
          })
        );
      })
    );
  }

}
