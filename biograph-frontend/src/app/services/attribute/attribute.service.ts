import {Injectable} from '@angular/core';
import {Attribute} from '../../models/Attribute';
import {HttpClient} from '@angular/common/http';
import {API_URLS, insertUserInUrl} from '../../../api-urls';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
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

  public createNewAttribute(attribute: Attribute): Observable<Attribute> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map((user: User) => user.userId),
      mergeMap((userId: number): Observable<Attribute> => {
        const url = insertUserInUrl(API_URLS.ATTRIBUTE_URL, userId);
        return this.http.post<Attribute>(url, attribute).pipe(
          catchError((error) => {
            return of(null);
          })
        );
      })
    );
  }

  public getAttributesOwnedByCurrentUser(): Observable<Attribute[]> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map((user: User) => user.userId),
      mergeMap((userId: number) => {
        const url = insertUserInUrl(API_URLS.ATTRIBUTE_URL, userId);
        return this.http.get<Attribute[]>(url).pipe(
          catchError((error) => {
            return of(null);
          })
        );
      })
    );
  }

}
