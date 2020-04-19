import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ResponseStatus} from '../../models/ServerResponse';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';

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
              private snackBarService: SnackBarService
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
    console.log('Sending authentication request...');
    this.authService.authenticate(this.email, this.password).subscribe(r => {
      if (r.status === ResponseStatus.OK) {
        this.snackBarService.openSuccessSnackBar('Authentication successful');
      } else {
        this.snackBarService.openErrorSnackBar(r.data);
      }
    });
  }

}
