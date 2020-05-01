import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Attribute} from '../../models/Attribute';
import {MatSort} from '@angular/material/sort';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {NewAttributeDialogComponent} from './new-attribute-dialog/new-attribute-dialog.component';
import {AttributeService} from '../../services/attribute/attribute.service';

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
      creationTime: new Date().toISOString(),
      attributeType: 'NUMBER',
      constraint: null
    },
    {
      attributeId: 2,
      name: 'Height',
      description: 'My height in meters',
      totalCategories: 1,
      totalMeasurements: 10,
      creationTime: new Date().toISOString(),
      attributeType: 'NUMBER',
      constraint: null
    },
    {
      attributeId: 3,
      name: 'Cardio',
      description: 'Cardio exercising time ( in minutes )',
      totalCategories: 2,
      totalMeasurements: 15,
      creationTime: new Date().toISOString(),
      attributeType: 'NUMBER',
      constraint: null
    },
    {
      attributeId: 4,
      name: 'Heart rate ( before )',
      description: 'My heart rate before start exercising',
      totalCategories: 2,
      totalMeasurements: 18,
      creationTime: new Date().toISOString(),
      attributeType: 'NUMBER',
      constraint: null
    },
    {
      attributeId: 5,
      name: 'Feeling',
      description: 'How I feel myself after event ( from 1 to 10 )',
      totalCategories: 10,
      totalMeasurements: 8,
      creationTime: new Date().toISOString(),
      attributeType: 'NUMBER',
      constraint: null
    },
  ];
  /**
   * List of attributes that is displayed ( attributes are filtered according to search bar content )
   */
  filteredAttributes: Attribute[];
  columnsToDisplay = ['name', 'attributeType', 'totalMeasurements', 'totalCategories', 'creationTime'];
  /**
   * String that is currently entered in search bar
   */
  currentSearchQuery = '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Category>;

  constructor(
    public dialog: MatDialog,
    private attributeService: AttributeService
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
        this.attributeService.createNewAttribute(newAttribute).subscribe(response => {
          console.log('Got response: ', response);
          this.allAttributes.push(response);
          this.search(this.currentSearchQuery);
        });
      }
    });
  }

  private updateTableView() {
    this.dataSource = new MatTableDataSource<Attribute>(this.filteredAttributes);
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }
}
