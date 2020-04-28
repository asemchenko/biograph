import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Attribute} from '../../models/Attribute';
import {MatSort} from '@angular/material/sort';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {NewAttributeDialogComponent} from './new-attribute-dialog/new-attribute-dialog.component';

@Component({
  selector: 'app-attributes-page',
  templateUrl: './attributes-page.component.html',
  styleUrls: ['./attributes-page.component.less']
})
export class AttributesPageComponent implements OnInit {
  dataSource: MatTableDataSource<Attribute>;
  allAttributes: Attribute[] = [
    {
      attributeId: 1,
      name: 'Weight',
      description: 'My weight in kg',
      totalCategories: 1,
      totalMeasurements: 10,
      creationTime: 1588098739285
    },
    {
      attributeId: 2,
      name: 'Height',
      description: 'My height in meters',
      totalCategories: 1,
      totalMeasurements: 10,
      creationTime: 1588098721285
    },
    {
      attributeId: 3,
      name: 'Cardio',
      description: 'Cardio exercising time ( in minutes )',
      totalCategories: 2,
      totalMeasurements: 15,
      creationTime: 1582095707385
    },
    {
      attributeId: 4,
      name: 'Heart rate ( before )',
      description: 'My heart rate before start exercising',
      totalCategories: 2,
      totalMeasurements: 18,
      creationTime: 1588398780945
    },
    {
      attributeId: 5,
      name: 'Feeling',
      description: 'How I feel myself after event ( from 1 to 10 )',
      totalCategories: 10,
      totalMeasurements: 8,
      creationTime: 1588098709185
    },
  ];
  /**
   * List of attributes that is displayed ( attributes are filtered according to search bar content )
   */
  filteredAttributes: Attribute[];
  columnsToDisplay = ['name', 'totalMeasurements', 'totalCategories', 'creationTime'];
  /**
   * String that is currently entered in search bar
   */
  currentSearchQuery = '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Category>;

  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    // TODO asem init allAttributes from using backend query
    this.filteredAttributes = this.allAttributes;
    this.dataSource = new MatTableDataSource<Attribute>(this.filteredAttributes);
    this.dataSource.sort = this.sort;
  }

  search(searchQuery: string) {
    this.currentSearchQuery = searchQuery;
    const searchQueryLowerCase = searchQuery.toLowerCase();
    this.filteredAttributes = this.allAttributes.filter(attribute => {
      return attribute.name.toLowerCase().includes(searchQueryLowerCase);
    });
    this.updateTableView();
  }

  openNewAttributeDialog() {
    const dialogRef = this.dialog.open(
      NewAttributeDialogComponent,
      {
        width: 'min(700px, 95vw)'
      }
    );
    dialogRef.afterClosed().subscribe((newAttribute: Attribute) => {
      console.log('Got new attribute: ', newAttribute);
      if (newAttribute) {
        this.allAttributes.push(newAttribute);
        this.search(this.currentSearchQuery);
      }
    });
  }

  private updateTableView() {
    this.dataSource = new MatTableDataSource<Attribute>(this.filteredAttributes);
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }
}
