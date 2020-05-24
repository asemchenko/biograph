export interface Attribute {
  attributeId: number;
  name: string;
  description: string;
  /**
   * ISO-8601 formatted date
   */
  creationTime: string;
  /**
   * Amount of this attribute value
   */
  totalMeasurements: number;
  /**
   * Amount of categories that use is attribute
   */
  totalCategories: number;
  /**
   * Either 'NUMBER' or 'ENUMERATION'
   */
  attributeType: string;
  constraint: {
    name: string,
    /**
     * For 'ENUMERATION' type - list of possible values
     */
    possibleValues: string,
    /**
     * For 'NUMBER' type - minimal and maximum values ( inclusively )
     */
    min: number,
    max: number
  };
}

export enum AttributeType {
  NUMBER = 'NUMBER,',
  ENUMERATION = 'ENUMERATION',
}
