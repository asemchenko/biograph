import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.less']
})
export class QuestionDialogComponent implements OnInit {
  readonly primaryButtonClickedResponse: QuestionDialogResponse = {primaryButtonClicked: true, warnButtonClicked: false};
  readonly warnButtonClickedResponse: QuestionDialogResponse = {primaryButtonClicked: false, warnButtonClicked: true};

  constructor(@Inject(MAT_DIALOG_DATA) public config: QuestionDialogConfiguration) {
  }

  ngOnInit(): void {
  }

}

export interface QuestionDialogConfiguration {
  title: string;
  content: string;
  primaryButtonTitle: string;
  warnButtonTitle: string;
}

export interface QuestionDialogResponse {
  primaryButtonClicked: boolean;
  warnButtonClicked: boolean;
}
