import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Attribute} from '../../../models/Attribute';

const STUB_ATTRIBUTES: Attribute[] = [
  {attributeId: 1, name: 'Weight', description: 'Stub description', creationTime: 0},
  {attributeId: 2, name: 'Cardio', description: 'Stub description', creationTime: 0},
  {attributeId: 3, name: 'Squat', description: 'Stub description', creationTime: 0},
  {attributeId: 4, name: 'Push-up', description: 'Stub description', creationTime: 0},
];

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.less']
})
export class NewCategoryDialogComponent implements OnInit {
  readonly categoryNameMaxLength = 50;
  readonly attributeTableDisplayedColumns = ['name', 'remove'];
  /**
   * All possible attributes
   */
  allAttributes = STUB_ATTRIBUTES;
  /**
   * Attributes that user already add to category
   */
  searchFilteredAttributes: Observable<any[]>;
  categoryAttributes = [];
  color;
  attributes = new MatTableDataSource(this.categoryAttributes);
  searchAttributeFormControl = new FormControl();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) attributesTable: MatTable<any>;

  constructor() {
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
    this.categoryAttributes.push(
      this.searchAttributeFormControl.value
    );
    this.updateAttributesTable();
  }

  updateAttributesTable() {
    this.attributes = new MatTableDataSource(this.categoryAttributes);
    this.attributes.sort = this.sort;
    this.attributesTable.renderRows();
  }

  removeAttribute(attribute: any) {
    const index = this.categoryAttributes.indexOf(attribute, 0);
    if (index > -1) {
      this.categoryAttributes.splice(index, 1);
    }
    this.updateAttributesTable();
  }
}
