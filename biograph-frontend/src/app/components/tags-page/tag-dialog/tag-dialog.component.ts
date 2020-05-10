import {Component, Inject, OnInit} from '@angular/core';
import {Tag} from '../../../models/Tag';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.less']
})
export class TagDialogComponent implements OnInit {
  tag: Tag;
  tagNameMaxLength = 60;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: { tag: Tag },
  ) {
  }

  get tagNameFormControl(): AbstractControl {
    return this.formGroup.get('tagName');
  }

  ngOnInit(): void {
    this.tag = this.dialogData.tag;
    this.formGroup = new FormGroup({
      tagName: new FormControl(this.tag.name, [Validators.required, Validators.maxLength(this.tagNameMaxLength)]),
    });
  }

  getTagNameValidationError(): string {
    if (this.tagNameFormControl.hasError('maxlength')) {
      return 'Tag name length must be length than ' + this.tagNameMaxLength;
    }
    return 'Tag name is required';
  }

  collectTag(): Tag {
    this.tag.name = this.tagNameFormControl.value;
    return this.tag;
  }
}
