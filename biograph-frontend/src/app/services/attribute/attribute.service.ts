import {Injectable} from '@angular/core';
import {Attribute} from '../../models/Attribute';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../../../api-urls';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(
    private http: HttpClient
  ) {
  }

  createNewAttribute(attribute: Attribute) {
    return this.http.post(API_URLS.ATTRIBUTE_URL, attribute).pipe(
      tap(response => {
        console.log('[attribute service] Got response: ', response);
      }),
      catchError((error) => {
        console.log('[attribute service] Got error: ', error);
        return null;
      })
    );
  }

}
