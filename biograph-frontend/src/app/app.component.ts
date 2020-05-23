import {Component, OnInit} from '@angular/core';
import {AppState, getProgressBarStatus, getProgressSpinnerStatus} from './store/app.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'biograph-frontend';
  isProgressBarVisible: Observable<boolean>;
  isProgressSpinnerVisible: Observable<boolean>;

  constructor(
    private store$: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.isProgressSpinnerVisible = this.store$.select(getProgressSpinnerStatus);
    this.isProgressBarVisible = this.store$.select(getProgressBarStatus);
  }


}
