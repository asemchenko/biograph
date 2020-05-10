import {Attribute} from './Attribute';

export interface Parameter {
  parameterId: number;
  event: Event;
  value: string;
  attribute: Attribute;
}
