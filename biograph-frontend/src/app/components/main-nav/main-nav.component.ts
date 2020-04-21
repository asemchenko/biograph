import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {getIsLoggedIn} from '../../store/app.state';
import {LogOut} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.less']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLoggedIn: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {
    this.isLoggedIn = store.select(getIsLoggedIn);
  }

  logout() {
    this.store.dispatch(new LogOut());
  }
}
