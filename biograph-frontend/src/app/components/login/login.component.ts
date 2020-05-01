import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {AppState} from '../../store/app.state';
import {Store} from '@ngrx/store';
import {LogIn} from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(12)])
  });
  email;
  password;

  constructor(private authService: AuthService,
              private snackBarService: SnackBarService,
              private store: Store<AppState>
  ) {
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    console.log('Dispatching "LogIn" action to the store...');
    this.store.dispatch(new LogIn({email: this.email, password: this.password}));
  }

  getEmailValidationErrorMessage() {
    if (this.emailField.hasError('required')) {
      return 'Email is required';
    }
    return 'Enter a valid email';
  }

  getPasswordValidationErrorMessage() {
    if (this.passwordField.hasError('required')) {
      return 'Password is required';
    }
    return 'Password should consist of at least 12 chars';
  }
}
