export interface Attribute {
  attributeId: number;
  name: string;
  description: string;
  /**
   * milliseconds from 1970...
   */
  creationTime: number;
  /**
   * Amount of this attribute value
   */
  totalMeasurements: number;
  /**
   * Amount of categories that use is attribute
   */
  totalCategories: number;
}
