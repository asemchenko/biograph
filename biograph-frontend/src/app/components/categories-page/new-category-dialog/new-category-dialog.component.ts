import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.less']
})
export class NewCategoryDialogComponent implements OnInit {
  readonly categoryNameMaxLength = 50;
  attributesList = [
    {attributeId: 1, name: 'Weight', description: 'Stub description'},
    {attributeId: 2, name: 'Cardio', description: 'Stub description'},
    {attributeId: 3, name: 'Squat', description: 'Stub description'},
    {attributeId: 4, name: 'Push-up', description: 'Stub description'},
  ];
  readonly attributeTableDisplayedColumns = ['name', 'remove'];

  color;
  attributes = new MatTableDataSource(this.attributesList);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable) attributesTable: MatTable<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.attributes.sort = this.sort;
  }

  addAttribute(attributeName: string) {
    // TODO implement adding existing attribute
    this.attributesList.push(
      {attributeId: null, name: attributeName, description: ''}
    );
    this.updateAttributesTable();
  }

  updateAttributesTable() {
    this.attributes = new MatTableDataSource(this.attributesList);
    this.attributes.sort = this.sort;
    this.attributesTable.renderRows();
  }

  removeAttribute(attribute: any) {
    const index = this.attributesList.indexOf(attribute, 0);
    if (index > -1) {
      this.attributesList.splice(index, 1);
    }
    this.updateAttributesTable();
  }
}
