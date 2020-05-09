import {Component, Input, OnInit} from '@angular/core';
import {Attribute} from '../../../../models/Attribute';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.less']
})
export class ParameterComponent implements OnInit {
  @Input()
  attribute: Attribute;

  constructor() {
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

  ngOnInit(): void {
    console.log('[parameter-component] Got attribute: ', JSON.stringify(this.attribute));
  }

}
