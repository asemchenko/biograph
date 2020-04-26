import {Attribute} from './Attribute';

export interface Category {
  categoryId: number;
  name: string;
  description: string;
  color: string;
  /**
   * milliseconds from 1970...
   */
  creationTime: number;
  attributes: Attribute[];
  totalEvents: number;
}
