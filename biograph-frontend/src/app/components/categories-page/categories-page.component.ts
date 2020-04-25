import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.less']
})
export class CategoriesPageComponent implements OnInit {
  readonly columnsToDisplay = ['name', 'creationTime', 'totalEvents'];
  readonly CATEGORIES = [
    {categoryId: 1, name: 'Fitness', color: 'green', creationTime: new Date(2020, 5, 1, 12, 45, 32, 1), totalEvents: 10},
    {categoryId: 2, name: 'Family', color: 'red', creationTime: new Date(2019, 7, 1, 12, 45, 32, 1), totalEvents: 20},
    {categoryId: 3, name: 'Self-development', color: 'blue', creationTime: new Date(2017, 9, 1, 12, 45, 32, 1), totalEvents: 7},
    {categoryId: 4, name: 'Hobby', color: 'grey', creationTime: new Date(2020, 3, 1, 12, 45, 32, 1), totalEvents: 24},
    {categoryId: 5, name: 'Health', color: 'yellow', creationTime: new Date(2010, 2, 1, 12, 45, 32, 1), totalEvents: 53},
  ];
  dataSource = new MatTableDataSource(this.CATEGORIES);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

}
