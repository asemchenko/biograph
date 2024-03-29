import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut} from '../actions/auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ServerResponse} from '../../../models/ServerResponse';
import {Injectable} from '@angular/core';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {AppStorageService} from '../../../services/app-storage/app-storage.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {HideSpinner, ShowSpinner} from '../../progress-indicators/actions/progress-indicators.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  LogIn = this.actions
    .pipe(
      ofType<LogIn>(AuthActionTypes.LOGIN),
      tap(() => {
        this.store$.dispatch(new ShowSpinner());
      }),
      map((action: LogIn) => action.payload),
      exhaustMap((payload: { email: string, password: string }) =>
        this.authService
          .authenticate(payload.email, payload.password)
          .pipe(
            map((response: ServerResponse) => {
              return new LogInSuccess(response);
            }),
            catchError((error: Error) => {
              this.snackBarService.openErrorSnackBar(error.message);
              return of(new LogInFailure(error));
            }),
          ),
      ),
    );

  @Effect({dispatch: false})
  LogInFailure = this.actions
    .pipe(
      ofType<LogInFailure>(AuthActionTypes.LOGIN_FAILURE),
      tap(() => {
        this.store$.dispatch(new HideSpinner());
      }),
      tap((action: LogInFailure) => {
        this.storageService.removeAuthToken();
      })
    );

  @Effect({dispatch: false})
  LogInSuccess = this.actions
    .pipe(
      ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap(() => {
        this.store$.dispatch(new HideSpinner());
      }),
      tap((action: LogInSuccess) => {
        this.storageService.putAuthToken(action.payload.authToken);
      }),
      tap((action: LogInSuccess) => {
        this.router.navigateByUrl('/');
      }),
      tap((action: LogInSuccess) => {
        this.snackBarService.openSuccessSnackBar('Authentication successful');
      }),
    );


  @Effect({dispatch: false})
  LogOut = this.actions.pipe(
    ofType<LogOut>(AuthActionTypes.LOGOUT),
    tap((action: LogOut) => {
      this.storageService.removeAuthToken();
      this.snackBarService.openSuccessSnackBar('Successfully logged out');
    })
  );

  constructor(
    private actions: Actions,
    private store$: Store<AppState>,
    private authService: AuthService,
    private storageService: AppStorageService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }
}
