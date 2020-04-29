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
    totalMeasurements: null,
    attributeType: null,
    constraint: {
      name: null,
      min: null,
      max: null,
      values: []
    }
  };
  readonly attributeNameMaxLength = 50;
  formGroup = new FormGroup({
    attributeName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    attributeType: new FormControl('', [Validators.required]),
    attributeConstraintNameFormControl: new FormControl('', []),
  });
  numberTypeMinValueConstraint = new FormControl('', [Validators.required]);
  numberTypeMaxValueConstraint = new FormControl('', [Validators.required]);
  enumAttributeTypePossibleValuesConstraint = new FormControl('', [Validators.required]);
  readonly attributeTypes = {
    number: {name: 'Number', description: 'For storing numbers'},
    enumeration: {name: 'Enumeration', description: 'For storing strings'}
  };
  attributeTypesList = [
    this.attributeTypes.number,
    this.attributeTypes.enumeration
  ];
  attributeTypeConstraintName: string;

  constructor() {
  }

  get attributeNameFormControl() {
    return this.formGroup.get('attributeName');
  }

  get attributeTypeFormControl() {
    return this.formGroup.get('attributeType');
  }

  get attributeConstraintNameFormControl() {
    return this.formGroup.get('attributeConstraintNameFormControl');
  }

  ngOnInit(): void {
  }

  getAttributeNameValidationErrorMessage() {
    if (this.attributeNameFormControl.hasError('required')) {
      return 'Metric name is required';
    }
    return 'Metric name length must be less than ' + this.attributeNameMaxLength;
  }

  /**
   * Collects attribute parts (name, description, etc) from input UI elements
   */
  collectAttribute(): Attribute {
    this.attribute.name = this.attributeNameFormControl.value;
    this.attribute.attributeType = this.attributeTypeFormControl.value.name;
    if (this.attribute.attributeType === this.attributeTypes.number.name) {
      this.attribute.constraint.name = this.attributeConstraintNameFormControl.value;
    } else {
      this.attribute.constraint.name = 'listValues';
    }
    switch (this.attribute.constraint.name) {
      case 'between':
        this.attribute.constraint.min = this.numberTypeMinValueConstraint.value;
        this.attribute.constraint.max = this.numberTypeMaxValueConstraint.value;
        break;
      case 'greaterThan':
        this.attribute.constraint.min = this.numberTypeMinValueConstraint.value;
        break;
      case 'lessThan':
        this.attribute.constraint.max = this.numberTypeMaxValueConstraint.value;
        break;
      default:
        if (this.attribute.attributeType === this.attributeTypes.enumeration.name) {
          this.attribute.constraint.values = this.enumAttributeTypePossibleValuesConstraint.value.split(',').map(value => value.trim());
        }
        break;
    }
    return this.attribute;
  }

  checkConstraintsValid(): boolean {
    if (this.attributeTypeFormControl.value === this.attributeTypes.enumeration) {
      return this.enumAttributeTypePossibleValuesConstraint.valid;
    }
    if (this.attributeTypeFormControl.value === this.attributeTypes.number) {
      let valid = true;
      switch (this.attributeConstraintNameFormControl.value) {
        case 'between':
          valid = valid && this.numberTypeMinValueConstraint.valid;
          valid = valid && this.numberTypeMaxValueConstraint.valid;
          break;
        case 'greaterThan':
          valid = valid && this.numberTypeMinValueConstraint.valid;
          break;
        case 'lessThan':
          valid = valid && this.numberTypeMaxValueConstraint.valid;
          break;
      }
      return valid;
    }
  }
}
