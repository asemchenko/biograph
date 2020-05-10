import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Attribute} from '../../models/Attribute';
import {MatSort} from '@angular/material/sort';
import {Category} from '../../models/Category';
import {MatDialog} from '@angular/material/dialog';
import {NewAttributeDialogComponent} from './new-attribute-dialog/new-attribute-dialog.component';
import {AttributeService} from '../../services/attribute/attribute.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-attributes-page',
  templateUrl: './attributes-page.component.html',
  styleUrls: ['./attributes-page.component.less']
})
export class AttributesPageComponent implements OnInit {
  dataSource: MatTableDataSource<Attribute>;
  allAttributes: Attribute[] = [];
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
    console.log('Loading user attributes...');
    this.attributeService.getAttributesOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((attributes) => {
      console.log('Got response: ', attributes);
      this.allAttributes = attributes;
      this.filteredAttributes = this.allAttributes;
      this.dataSource = new MatTableDataSource<Attribute>(this.filteredAttributes);
      this.dataSource.sort = this.sort;
    });
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
    // TODO asem REFACTOR move opening dialog logic to dialog.service
    const dialogRef = this.dialog.open(
      NewAttributeDialogComponent,
      {
        width: 'min(700px, 95vw)'
      }
    );
    // FIXME asem REFACTOR - subscribe in subscribe ( если забыл как - чекни как реализовано в categories-page.component.ts )
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
