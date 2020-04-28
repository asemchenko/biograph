import {Component, OnInit} from '@angular/core';
import {Attribute} from '../../../models/Attribute';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-attribute-dialog',
  templateUrl: './new-attribute-dialog.component.html',
  styleUrls: ['./new-attribute-dialog.component.less']
})
export class NewAttributeDialogComponent implements OnInit {
  attribute: Attribute = {
    attributeId: null,
    name: '',
    description: '',
    creationTime: null,
    totalCategories: null,
    totalMeasurements: null
  };
  readonly attributeNameMaxLength = 50;
  formGroup = new FormGroup({
    attributeName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    attributeType: new FormControl('', [Validators.required])
  });
  readonly attributeTypes = {
    number: {name: 'Number', description: 'For storing numbers'},
    enumeration: {name: 'Enumeration', description: 'For storing strings'}
  };
  attributeTypesList = [
    this.attributeTypes.number,
    this.attributeTypes.enumeration
  ];

  constructor() {
  }

  get attributeNameFormControl() {
    return this.formGroup.get('attributeName');
  }

  get attributeTypeFormControl() {
    return this.formGroup.get('attributeType');
  }

  ngOnInit(): void {
  }

  getAttributeNameValidationErrorMessage() {
    if (this.attributeNameFormControl.hasError('required')) {
      return 'Metric name is required';
    }
    return 'Metric name length must be less than ' + this.attributeNameMaxLength;
  }
}
