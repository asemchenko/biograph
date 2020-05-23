import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getIsLoggedIn} from '../../store/app.state';
import {LogOut} from '../../store/auth/actions/auth.actions';
import {RxUnsubscribe} from '../../common/RxUnsubscribe';
import {getIsProgressBarStatus, getProgressSpinnerStatus} from '../../store/progress-indicators/reducers/progress-indicators.reducers';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.less']
})
export class MainNavComponent extends RxUnsubscribe implements OnInit {

  isLoggedIn: Observable<boolean>;
  isProgressBarVisible = false;
  isProgressSpinnerVisible = false;

  constructor(
    private store: Store
  ) {
    super();
    this.isLoggedIn = store.select(getIsLoggedIn);
  }

  ngOnInit(): void {
    this.store.select(getProgressSpinnerStatus).pipe(
      takeUntil(this.destroy$),
    ).subscribe((spinnerStatus: boolean) => {
      this.isProgressSpinnerVisible = spinnerStatus;
    });
    this.store.select(getIsProgressBarStatus).pipe(
      takeUntil(this.destroy$),
    ).subscribe((progressBarStatus: boolean) => {
      this.isProgressBarVisible = progressBarStatus;
    });
    // just for checking progress spinner
    /*  setInterval(() => {
        this.isProgressSpinnerVisible = !this.isProgressSpinnerVisible;
        console.log('Current progress spinner visibility status: ', this.isProgressSpinnerVisible);
      }, 3000);*/
    // just for checking progress bar
    /*setInterval(() => {
      this.isProgressBarVisible = !this.isProgressBarVisible;
      console.log('Current progress bar visibility status: ', this.isProgressBarVisible);
    }, 3000);*/
  }


  logout() {
    this.store.dispatch(new LogOut());
  }
}
