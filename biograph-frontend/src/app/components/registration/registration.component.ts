import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {ResponseStatus} from '../../models/ServerResponse';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  email;
  nickname;
  password;
  passwordConfirmation;

  constructor(private authService: AuthService,
              private snackBarService: SnackBarService,
              private router: Router
  ) {
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get passwordConfirmationField() {
    return this.form.get('passwordConfirmation');
  }

  get nicknameField() {
    return this.form.get('nickname');
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  onFormSubmit() {
    console.log('Sending registration request...');
    this.authService.register(this.email, this.nickname, this.password).subscribe(r => {
      this.snackBarService.showMessage('Registration successful', r);
      if (r.status === ResponseStatus.OK) {
        this.router.navigateByUrl('/login');
      }
    });

  }

  passwordConfirmationValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = this.password !== control.value;
      return forbidden ? {passwordsSimilarity: {value: control.value}} : null;
    };
  }

  private initFormGroup() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      nickname: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(12)]),
      passwordConfirmation: new FormControl(null, [Validators.required, this.passwordConfirmationValidator()])
    });
  }

  getEmailValidationErrorMessage() {
    if (this.emailField.hasError('required')) {
      return 'Email is required';
    }
    return 'Enter a valid email';
  }

  getNicknameValidationErrorMessage() {
    if (this.nicknameField.hasError('required')) {
      return 'Nickname is required';
    }
    return 'Nickname should consists of at least 4 chars';
  }

  getPasswordValidationErrorMessage() {
    if (this.passwordField.hasError('required')) {
      return 'Password is required';
    }
    return 'Password should consist of at least 12 chars';
  }

  getPasswordConfirmationErrorMessage() {
    if (this.passwordConfirmationField.hasError('required')) {
      return 'Enter your password again';
    }
    return 'Passwords are not similar';
  }
}
