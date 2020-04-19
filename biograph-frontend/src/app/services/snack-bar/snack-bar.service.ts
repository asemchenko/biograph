import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

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
}
