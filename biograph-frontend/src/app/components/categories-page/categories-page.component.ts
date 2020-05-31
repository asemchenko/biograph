import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewCategoryDialogComponent} from './new-category-dialog/new-category-dialog.component';
import {Category} from '../../models/Category';
import {CategoryService} from '../../services/category/category.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';
import {DialogService} from '../../services/dialog/dialog.service';
import {RxUnsubscribe} from '../../common/RxUnsubscribe';
import {SafeDeleteDialogResponse} from '../modals/safe-delete-dialog/safe-delete-dialog.component';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, getAllCategories} from '../../store/app.state';
import {CreateCategory, DeleteCategory, LoadAllCategories} from '../../store/categories/actions/category.actions';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.less']
})
export class CategoriesPageComponent extends RxUnsubscribe implements OnInit {
  readonly columnsToDisplay = ['name', /*'creationTime',*/ 'totalEvents', 'attributes', 'color', 'actions'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<Category>;
  searchQuery$ = new BehaviorSubject('');
  filteredCategories$: Observable<Category[]>;

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private store: Store<AppState>,
  ) {
    super();
  }

  ngOnInit(): void {
    // dirty hack - waiting for MatTable loading
    setTimeout(() => {
      this.store.dispatch(new LoadAllCategories());
      this.filteredCategories$ = combineLatest(this.searchQuery$, this.store.select(getAllCategories)).pipe(
        takeUntil(this.destroy$),
        map(([searchQuery, categories]) => {
          return this.search(searchQuery, categories);
        }),
      );
      this.filteredCategories$.subscribe((categories: Category[]) => {
        this.updateTableView(categories);
      });
    }, 100);
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
      takeUntil(this.destroy$),
    ).subscribe((category: Category) => {
      if (category) {
        this.store.dispatch(new CreateCategory(category));
      }
    });
  }

  onSearchQueryChanged(searchQuery: string): void {
    this.searchQuery$.next(searchQuery);
  }

  search(searchQuery: string, categories: Category[]) {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return categories.filter(category => {
      return category.name.toLowerCase().includes(searchQueryLowerCase);
    });
  }

  onViewCategoryClicked(category: Category): void {

  }

  onDeleteCategoryClicked(category: Category): void {
    /*this.dialogService
      .openQuestionDialog({
        title: `You are going to delete category "${category.name}". Are you sure?`,
        content: null,
        primaryButtonTitle: 'No',
        warnButtonTitle: 'Yes, delete'
      })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        take(1)
      ).subscribe((response: QuestionDialogResponse) => {
      if (response && response.warnButtonClicked) {
        console.log('Removing category...');
      }
    });*/
    const deletePassText = category.name;
    this.dialogService.openSafeDeleteDialog({
      title: `You are going to delete category '${category.name}. Are you sure?'`,
      content: `This will lead to removing all events with category '${category.name}' (${category.totalEvents} events)`,
      deletePassText,
    })
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        take(1),
      ).subscribe((response: SafeDeleteDialogResponse) => {
      if (response && response.isDeleteClicked) {
        this.store.dispatch(new DeleteCategory(category));
      }
    });

  }

  private updateTableView(filteredCategories: Category[]) {
    this.dataSource = new MatTableDataSource(
      filteredCategories
    );
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }
}
