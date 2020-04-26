export interface Attribute {
  attributeId: number;
  name: string;
  description: string;
  /**
   * milliseconds from 1970...
   */
  creationTime: number;
}
