import {Injectable} from '@angular/core';
import {Attribute} from '../../models/Attribute';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor() {
  }

  createNewAttribute(attribute: Attribute): Observable<Attribute> {
    attribute.creationTime = new Date().getTime();
    return of(attribute);
  }

}
