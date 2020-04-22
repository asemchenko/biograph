import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppStorageService} from '../app-storage/app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private storageService: AppStorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.storageService.getAuthToken();
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: authToken,
        }
      });
    }
    return next.handle(request);
  }


}
