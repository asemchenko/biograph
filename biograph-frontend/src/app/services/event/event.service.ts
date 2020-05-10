import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, take, tap} from 'rxjs/operators';
import {API_URL} from '../../../api-urls';
import {Event} from '../../models/Event';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public getEventsOwnedByCurrentUser(): Observable<Event[]> {
    return of([]);
  }

  public create(event: Event): Observable<Event> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        const url = `${API_URL}/api/users/${userId}/events`;
        return this.http.post<Event>(url, event).pipe(
          tap(response => {
            console.log('[event service] Got response: ', response);
          }),
          catchError(error => {
            console.log('[event service] Got error: ', error);
            return of(null);
          })
        );
      })
    );
  }
}
