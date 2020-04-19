import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerResponse} from '../../models/ServerResponse';
import {API_URLS} from '../../../api-urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(email: string, password: string): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(API_URLS.LOGIN_URL, {email, password});
  }
}
