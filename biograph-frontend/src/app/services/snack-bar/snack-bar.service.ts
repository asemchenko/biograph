import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {getErrorMessage, ResponseStatus, ServerResponse} from '../../models/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  openErrorSnackBar(msg: string = 'An error occurred'): void {
    const message = msg;
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  showMessage(okMessage: string, response: ServerResponse) {
    if (response.status === ResponseStatus.OK) {
      this.openSuccessSnackBar(okMessage);
    } else if (response.status === ResponseStatus.ERROR) {
      this.openErrorSnackBar(getErrorMessage(response));
    } else if (response.status === ResponseStatus.REDIRECT) {
      // nothing to show
    } else {
      this.openErrorSnackBar(response.data);
    }
  }
}
