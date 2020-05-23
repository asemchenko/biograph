import {Component, OnInit} from '@angular/core';
import {AppState, getProgressSpinnerStatus} from './store/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'biograph-frontend';
  isBlurred: Observable<boolean>;

  constructor(
    private store$: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.isBlurred = this.store$.select(getProgressSpinnerStatus);
  }


}
