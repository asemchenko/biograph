import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getTagsOwnedByCurrentUser(): Observable<Tag[]> {
    return of([
      {tagId: 1, name: 'Personal', color: null, description: 'My private life'},
      {tagId: 2, name: 'Friends', color: null, description: 'Activity with my friends'},
      {tagId: 3, name: 'Important', color: null, description: 'Something, that looks important'},
      {tagId: 4, name: 'Watch later', color: null, description: 'Need to think about it later'},
    ]);
  }
}
