import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewCategoryDialogComponent} from './new-category-dialog/new-category-dialog.component';
import {Category} from '../../models/Category';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrls: ['./categories-page.component.less']
})
export class CategoriesPageComponent implements OnInit {
    readonly columnsToDisplay = ['name', 'creationTime', 'totalEvents'];
    readonly allCategories: Category[] = [
        {
            categoryId: 1,
            name: 'Fitness',
            color: 'green',
            creationTime: 135468,
            totalEvents: 10,
            description: 'Stub description',
            attributes: []
        },
        {
            categoryId: 2,
            name: 'Family',
            color: 'red',
            creationTime: 32010703000,
            totalEvents: 20,
            description: 'Stub description',
            attributes: []
        },
        {
            categoryId: 3,
            name: 'Self-development',
            color: 'blue',
            creationTime: 0,
            totalEvents: 7,
            description: 'Stub description',
            attributes: []
        },
        {
            categoryId: 4,
            name: 'Hobby',
            color: 'grey',
            creationTime: 68150970000,
            totalEvents: 24,
            description: 'Stub description',
            attributes: []
        },
        {
            categoryId: 5,
            name: 'Health',
            color: 'yellow',
            creationTime: 110150104000,
            totalEvents: 53,
            description: 'Stub description',
            attributes: []
        },
    ];
    dataSource = new MatTableDataSource(this.allCategories);
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatTable, {static: true}) table: MatTable<Category>;

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
    }

    openNewCategoryDialog() {
        this.dialog.open(
            NewCategoryDialogComponent,
            {
                width: 'min(700px, 95vw)'
            }
        );
    }

    search(searchQuery: string) {
        const searchQueryLowerCase = searchQuery.toLowerCase();
        const filteredCategories = this.allCategories.filter(category => {
            return category.name.toLowerCase().includes(searchQueryLowerCase);
        });
        this.dataSource = new MatTableDataSource(
            filteredCategories
        );
        this.table.renderRows();
    }
}
