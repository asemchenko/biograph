import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewCategoryDialogComponent} from './new-category-dialog/new-category-dialog.component';
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category/category.service';
import {mergeMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.less']
})
export class CategoriesPageComponent implements OnInit {
  readonly columnsToDisplay = ['name', 'creationTime', 'totalEvents', 'attributes', 'color'];
  allCategories: Category[] = [];
  // TODO asem maybe it is better to make data source reactive ( no need to call table.renderRows() each time )
  dataSource = new MatTableDataSource(this.allCategories);
  currentSearchQuery = '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Category>;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.categoryService.getCategoriesOwnedByCurrentUser().pipe(
      take(1),
    ).subscribe((categories: Category[]) => {
      this.allCategories = categories;
      this.updateTableView(this.allCategories);
    });
  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(
      NewCategoryDialogComponent,
      {
        width: 'min(700px, 95vw)'
      }
    );
    dialogRef.afterClosed().pipe(
      take(1),
      tap((newCategory: Category) => {
        console.log('[categories-page] Got from dialog: ', newCategory);
      }),
      mergeMap((newCategory: Category) => {
        return this.categoryService.createCategory(newCategory);
      })
    ).subscribe((createdCategory: Category) => {
      console.log('[categories-page] Got created category from service: ', createdCategory);
      this.allCategories.push(createdCategory);
      this.search(this.currentSearchQuery);
    });
  }

  search(searchQuery: string) {
    this.currentSearchQuery = searchQuery;
    const searchQueryLowerCase = searchQuery.toLowerCase();
    const filteredCategories = this.allCategories.filter(category => {
      return category.name.toLowerCase().includes(searchQueryLowerCase);
    });
    this.updateTableView(filteredCategories);
  }

  private updateTableView(filteredCategories: Category[]) {
    this.dataSource = new MatTableDataSource(
      filteredCategories
    );
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }
}
