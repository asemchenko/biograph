import {Injectable} from '@angular/core';

/**
 * Is used to get/put smth to local storage
 */
@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() {
  }

  private readonly authTokenKeyName = 'authToken';

  putAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKeyName, token);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKeyName);
  }
}
