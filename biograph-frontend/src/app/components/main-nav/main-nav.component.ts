import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {getIsLoggedIn} from '../../store/app.state';
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

  constructor(
    private store: Store,
    private router: Router,
  ) {
    super();
    this.isLoggedIn = store.select(getIsLoggedIn);
  }

  ngOnInit(): void {
  }


  logout() {
    this.store.dispatch(new LogOut());
  }

  navigateToMain() {
    this.router.navigateByUrl('/');
  }
}
