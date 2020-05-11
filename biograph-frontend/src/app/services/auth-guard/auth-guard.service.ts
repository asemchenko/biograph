import {Injectable} from '@angular/core';
import {AppStorageService} from '../app-storage/app-storage.service';
import {CanActivate} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private storage: AppStorageService,
    private authService: AuthService,
  ) {
  }

  canActivate(): boolean {
    // TODO asem IMPORTANT check token expiration!
    return this.authService.isAuthenticated(this.storage.getAuthToken());
  }


}
