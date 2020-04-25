import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut} from '../actions/auth.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ServerResponse} from '../../models/ServerResponse';
import {Injectable} from '@angular/core';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {AppStorageService} from '../../services/app-storage/app-storage.service';

@Injectable()
export class AuthEffects {
  @Effect()
  LogIn = this.actions
    .pipe(
      ofType<LogIn>(AuthActionTypes.LOGIN),
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
      tap((action: LogInFailure) => {
        this.storageService.removeAuthToken();
      })
    );

  @Effect({dispatch: false})
  LogInSuccess = this.actions
    .pipe(
      ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap((action: LogInSuccess) => {
        console.log('[LogInSuccess effect] got action: ', action);
        this.storageService.putAuthToken(action.payload.authToken);
      }),
      tap((action: LogInSuccess) => {
        this.snackBarService.openSuccessSnackBar('Authentication successful');
      }),
    );


  @Effect({dispatch: false})
  LogOut = this.actions.pipe(
    ofType<LogOut>(AuthActionTypes.LOGOUT),
    tap((action: LogOut) => {
      console.log('[LogOut Effect] Removing token from localStorage');
      this.storageService.removeAuthToken();
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private storageService: AppStorageService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
  }
}
