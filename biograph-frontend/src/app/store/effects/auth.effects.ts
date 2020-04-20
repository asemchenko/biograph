import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess} from '../actions/auth.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

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
            map(user => new LogInSuccess({user})),
            catchError(error => of(new LogInFailure(error))),
          ),
      ),
    );

  /*  @Effect()
    LogIn: Observable<any> = this.actions.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        return this.authService.authenticate(payload.email, payload.password).pipe(
          map((user) => {
            return new LogInSuccess({token: user.token, email: payload.email});
          }),
          catchError((error) => {
            return Observable.of(new LogInFailure({error}));
          })
        )
      }),
      map((action: LogIn) => action.payload)
    );*/

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}
