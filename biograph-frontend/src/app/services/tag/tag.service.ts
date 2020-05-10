import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../../models/Tag';
import {AuthService} from '../auth/auth.service';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {API_URL} from '../../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  getTagsOwnedByCurrentUser(): Observable<Tag[]> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        const url = `${API_URL}/api/users/${userId}/tags`;
        return this.http.get<Tag[]>(url).pipe(
          tap(response => {
            console.log('[tag service] Got response: ', response);
          }),
          catchError(error => {
            console.log('[tag service] Got error: ', error);
            return of(null);
          })
        );
      })
    );
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        const url = `${API_URL}/api/users/${userId}/tags`;
        return this.http.post<Tag>(url, tag).pipe(
          tap(response => {
            console.log('[tag service] Got response: ', response);
          }),
          catchError(error => {
            console.log('[tag service] Got error: ', error);
            return of(null);
          })
        );
      })
    );
  }
}
