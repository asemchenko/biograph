import {Injectable} from '@angular/core';

/**
 * Is used to get/put smth to local storage
 */
@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private readonly authTokenKeyName = 'authToken';

  constructor() {
  }

  putAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKeyName, token);
  }

  getAuthToken(): string {
    return localStorage.getItem(this.authTokenKeyName);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKeyName);
  }
}
