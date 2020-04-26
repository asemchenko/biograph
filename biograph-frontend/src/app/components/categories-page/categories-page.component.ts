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
    // TODO asem maybe it is better to make data source reactive ( no need to call table.renderRows() each time )
    dataSource = new MatTableDataSource(this.allCategories);
    currentSearchQuery = '';
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
        const dialogRef = this.dialog.open(
            NewCategoryDialogComponent,
            {
                width: 'min(700px, 95vw)'
            }
        );
        dialogRef.afterClosed().subscribe((newCategory: Category) => {
            console.log('Got new category: ', newCategory);
            // TODO add backend request for save
            newCategory.creationTime = new Date().getTime();
            this.allCategories.push(newCategory);
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
