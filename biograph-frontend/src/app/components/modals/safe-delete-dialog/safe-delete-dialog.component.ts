import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-safe-delete-dialog',
  templateUrl: './safe-delete-dialog.component.html',
  styleUrls: ['./safe-delete-dialog.component.less']
})
export class SafeDeleteDialogComponent implements OnInit {
  readonly deleteResponse: SafeDeleteDialogResponse = {isDeleteClicked: true};
  readonly cancelResponse: SafeDeleteDialogResponse = {isDeleteClicked: false};

  constructor(@Inject(MAT_DIALOG_DATA) public config: SafeDeleteDialogConfig) {
  }

  ngOnInit(): void {
  }

}

export interface SafeDeleteDialogConfig {
  title: string;
  content: string;
  /**
   * Text, that user must input manually, to perform remove action
   */
  deletePassText: string;
}

export interface SafeDeleteDialogResponse {
  isDeleteClicked: boolean;
}
