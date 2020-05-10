import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attribute} from '../../../../models/Attribute';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.less']
})
export class ParameterComponent implements OnInit {
  @Input()
  attribute: Attribute;
  formControl: FormControl;
  /*@Output()
  parameterFormControl = new EventEmitter<FormControl>();*/
  @Output()
  parameterInfo$ = new EventEmitter<ParameterInfo>();
  parameterInfo: ParameterInfo;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  get isNumber(): boolean {
    return this.attribute.attributeType === 'NUMBER';
  }

  get isEnumeration(): boolean {
    return this.attribute.attributeType === 'ENUMERATION';
  }

  get attributePossibleValues(): string[] {
    return this.attribute.constraint.possibleValues.split(',');
  }

  get numberFormFieldHint(): string {
    if (this.attribute.constraint && this.attribute.constraint.name) {
      switch (this.attribute.constraint.name) {
        case 'between':
          return 'Between ' + this.attribute.constraint.min + ' and ' + this.attribute.constraint.max;
          break;
        case 'lessThan':
          return 'Less than ' + this.attribute.constraint.max;
          break;
        case 'greaterThan':
          return 'Greater than ' + this.attribute.constraint.min;
          break;
      }
    }
    return '';
  }

  get numberMinValue(): number {
    return this.attribute.constraint.min;
  }

  get numberMaxValue(): number {
    return this.attribute.constraint.max;
  }

  get numberValidationErrorMessage(): string {
    const minConstraintFails = this.formControl.hasError('min');
    const maxConstraintFails = this.formControl.hasError('max');

    if (minConstraintFails && maxConstraintFails) {
      return 'Valus must be in range [ ' + this.numberMinValue + '; ' + this.numberMaxValue + ' ]';
    }
    if (minConstraintFails) {
      return 'Value must not be less than ' + this.numberMinValue;
    }
    if (maxConstraintFails) {
      return 'Value must not be more than ' + this.numberMaxValue;
    }
    return 'Value is required';
  }

  ngOnInit(): void {
    console.log('[parameter-component] Got attribute: ', JSON.stringify(this.attribute));
    this.formControl = this.createFormControl();
    this.parameterInfo = {
      formControl: this.formControl,
      attribute: this.attribute,
    };
    this.parameterInfo$.emit(this.parameterInfo);
  }

  private createFormControl(): FormControl {
    const validators = [Validators.required];
    if (this.isNumber) {
      if (this.attribute.constraint.min) {
        validators.push(Validators.min(this.attribute.constraint.min));
      }
      if (this.attribute.constraint.max) {
        validators.push(Validators.max(this.attribute.constraint.max));
      }
    }
    return this.formBuilder.control('', validators);
  }
}

export interface ParameterInfo {
  formControl: FormControl;
  attribute: Attribute;
}
