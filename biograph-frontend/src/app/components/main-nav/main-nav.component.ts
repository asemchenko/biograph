import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getIsLoggedIn, getProgressBarStatus, getProgressSpinnerStatus} from '../../store/app.state';
import {LogOut} from '../../store/auth/actions/auth.actions';
import {RxUnsubscribe} from '../../common/RxUnsubscribe';
import {Router} from '@angular/router';

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
    private store: Store,
    private router: Router,
  ) {
    super();
    this.isLoggedIn = store.select(getIsLoggedIn);
  }

  ngOnInit(): void {
    this.store.select(getProgressSpinnerStatus).pipe(
      // takeUntil(this.destroy$),
    ).subscribe((spinnerStatus: boolean) => {
      console.log('Got progress spinner status: ', spinnerStatus);
      this.isProgressSpinnerVisible = spinnerStatus;
    });
    this.store.select(getProgressBarStatus).pipe(
      // takeUntil(this.destroy$),
    ).subscribe((progressBarStatus: boolean) => {
      console.log('Got progress bar status: ', progressBarStatus);
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

  navigateToMain() {
    this.router.navigateByUrl('/');
  }
}
