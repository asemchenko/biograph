import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Attribute} from '../../../models/Attribute';
import {Category} from '../../../models/Category';


@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.less']
})
export class NewCategoryDialogComponent implements OnInit {
  // TODO asem remove
  STUB_ATTRIBUTES: Attribute[] = [
    {attributeId: 1, name: 'Weight', description: 'Stub description', creationTime: 0},
    {attributeId: 2, name: 'Cardio', description: 'Stub description', creationTime: 0},
    {attributeId: 3, name: 'Squat', description: 'Stub description', creationTime: 0},
    {attributeId: 4, name: 'Push-up', description: 'Stub description', creationTime: 0},
  ];

  readonly categoryNameMaxLength = 50;
  readonly attributeTableDisplayedColumns = ['name', 'remove'];
  readonly category: Category = {
    name: '',
    description: '',
    color: '',
    attributes: [],
    categoryId: null,
    creationTime: null,
    totalEvents: 0
  };
  /**
   * All possible attributes
   */
  allAttributes = this.STUB_ATTRIBUTES;
  /**
   * Attributes that user already add to category
   */
  searchFilteredAttributes: Observable<any[]>;
  attributes = new MatTableDataSource(this.category.attributes);
  searchAttributeFormControl = new FormControl();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) attributesTable: MatTable<any>;

  constructor() {
  }

  private static removeAttributeFromCollection(attribute: Attribute, collection: Attribute[]): void {
    const index = collection.indexOf(attribute, 0);
    if (index > -1) {
      collection.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.attributes.sort = this.sort;
    this.searchFilteredAttributes = this.searchAttributeFormControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.name),
      startWith(''),
      map(value => {
        return this.findMatchingAttributes(value);
      })
    );
  }

  findMatchingAttributes(searchQuery: string): any[] {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return this.allAttributes.filter(attribute => attribute.name.toLowerCase().includes(lowerCaseSearchQuery));

  }

  searchAttributeDisplayFn(attribute): string {
    return (attribute && attribute.name) ? attribute.name : '';
  }

  addAttribute() {
    // TODO implement adding existing attribute
    const attribute = this.searchAttributeFormControl.value;
    NewCategoryDialogComponent.removeAttributeFromCollection(attribute, this.allAttributes);
    this.category.attributes.push(attribute);
    this.updateAttributesTable();
  }

  updateAttributesTable() {
    this.attributes = new MatTableDataSource(this.category.attributes);
    this.attributes.sort = this.sort;
    this.attributesTable.renderRows();
  }

  removeAttribute(attribute: Attribute) {
    NewCategoryDialogComponent.removeAttributeFromCollection(attribute, this.category.attributes);
    this.allAttributes.push(attribute);
    this.searchAttributeFormControl.setValue(this.searchAttributeFormControl.value);
    this.updateAttributesTable();
    console.log(this.allAttributes);
  }
}
