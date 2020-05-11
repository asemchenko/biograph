import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getErrorMessage, ResponseStatus, ServerResponse} from '../../models/ServerResponse';
import {API_URLS} from '../../../api-urls';
import {map} from 'rxjs/operators';
import {User} from '../../models/User';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private store: Store) {
  }

  authenticate(email: string, password: string): Observable<ServerResponse> {
    console.log('[AuthService] Sending authentication request...');
    return this.httpClient.post<ServerResponse>(API_URLS.LOGIN_URL, {email, password})
      .pipe(
        map((r: ServerResponse) => {
          console.log('[AuthService] Pipe - got response: ', r);
          if (r.status === ResponseStatus.OK) {
            return r;
          } else {
            throw new Error(getErrorMessage(r));
          }
        })
      );
  }

  register(email: string, nickname: string, password: string): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(API_URLS.REGISTER_URL, {email, nickname, password});
  }

  getCurrentUser(): Observable<User> {
    return this.store.select(getCurrentUser);
  }

  isAuthenticated(jwtToken: string): boolean {
    return !!jwtToken;
  }
}
