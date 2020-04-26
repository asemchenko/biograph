import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.less']
})
export class NewCategoryDialogComponent implements OnInit {
  readonly categoryNameMaxLength = 50;

  constructor() {
  }

  ngOnInit(): void {
  }

}
