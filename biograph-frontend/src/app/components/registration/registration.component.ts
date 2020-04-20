import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';

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
              private snackBarService: SnackBarService
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
    /*this.authService.authenticate(this.email, this.password).subscribe(r => {
      if (r.status === ResponseStatus.OK) {
        this.snackBarService.openSuccessSnackBar('Authentication successful');
      } else {
        this.snackBarService.openErrorSnackBar(r.data);
      }
    });*/

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
}
