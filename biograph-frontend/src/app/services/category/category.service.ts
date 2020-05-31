import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../models/Category';
import {Observable, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {catchError, map, mergeMap, take} from 'rxjs/operators';
import {API_URLS, insertUserInUrl} from '../../../api-urls';
import {ServerResponse} from '../../models/ServerResponse';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  createCategory(category: Category): Observable<Category> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        const url = insertUserInUrl(API_URLS.CATEGORY_URL, userId);
        return this.http.post<Category>(url, category).pipe(
          catchError(error => {
            return of(null);
          })
        );
      })
    );
  }

  deleteCategory(category: Category): Observable<ServerResponse> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        return this.http.delete<ServerResponse>(`${environment.BASE_URL}/api/users/${userId}/categories/${category.categoryId}`);
      })
    );
  }

  getCategoriesOwnedByCurrentUser(): Observable<Category[]> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(user => user.userId),
      mergeMap((userId: number) => {
        const url = insertUserInUrl(API_URLS.CATEGORY_URL, userId);
        return this.http.get<Category[]>(url).pipe(
          catchError(error => {
            return of(null);
          })
        );
      })
    );
  }
}
