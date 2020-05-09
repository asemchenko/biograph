import {Component, Inject, OnInit} from '@angular/core';
import {Tag} from '../../../models/Tag';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.less']
})
export class TagDialogComponent implements OnInit {
  tag: Tag;
  tagNameMaxLength = 60;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: { tag: Tag },
  ) {
  }

  ngOnInit(): void {
    this.tag = this.dialogData.tag;
  }

}
