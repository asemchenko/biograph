import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap, withLatestFrom} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {AppState, getCategoriesState} from '../../app.state';
import {
  HideProgressBar,
  HideSpinner,
  ProgressIndicatorType,
  ShowProgressBar,
  ShowSpinner
} from '../../progress-indicators/actions/progress-indicators.actions';
import {of} from 'rxjs';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {
  CategoryActionsTypes,
  CreateCategory,
  CreateCategoryFailure,
  CreateCategorySuccess,
  DeleteCategory,
  DeleteCategoryFailure,
  DeleteCategorySuccess,
  LoadAllCategories,
  LoadAllCategoriesFailure,
  LoadAllCategoriesFromBackend,
  LoadAllCategoriesSuccess
} from '../actions/category.actions';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/Category';
import {LoadAllEventsFromBackend} from '../../events/actions/event.actions';

@Injectable()
export class CategoryEffects {
  @Effect()
  LoadAllCategories = this.actions$.pipe(
    ofType<LoadAllCategories>(CategoryActionsTypes.LOAD_ALL_CATEGORIES),
    withLatestFrom(this.store.select(getCategoriesState)),
    map(([action, categoriesState]) => {
      if (categoriesState.isLoaded) {
        return new LoadAllCategoriesSuccess(categoriesState.categories);
      } else {
        return new LoadAllCategoriesFromBackend();
      }
    })
  );

  @Effect()
  LoadAllCategoriesFromBackend = this.actions$.pipe(
    ofType<LoadAllCategoriesFromBackend>(CategoryActionsTypes.LOAD_ALL_CATEGORIES_FROM_BACKEND),
    tap(() => {
      this.store.dispatch(new ShowSpinner());
    }),
    exhaustMap((action: Action) => {
      return this.categoryService.getCategoriesOwnedByCurrentUser().pipe(
        map((categories: Category[]) => (new LoadAllCategoriesSuccess(categories))),
        catchError((error) => {
          return of(new LoadAllCategoriesFailure());
        })
      );
    })
  );

  @Effect()
  LoadAllCategoriesSuccess = this.actions$
    .pipe(
      ofType<LoadAllCategoriesSuccess>(CategoryActionsTypes.LOAD_ALL_CATEGORIES_SUCCESS),
      map(() => {
        return new HideSpinner();
      }),
    );

  @Effect({dispatch: false})
  LoadAllCategoriesFailure = this.actions$
    .pipe(
      ofType<LoadAllCategoriesFailure>(CategoryActionsTypes.LOAD_ALL_CATEGORIES_FAILURE),
      tap(() => {
        this.store.dispatch(new HideSpinner());
      }),
      tap((action: LoadAllCategoriesFailure) => {
        this.snackBarService.openErrorSnackBar('Loading categories failed');
      }),
    );

  @Effect()
  CreateCategory = this.actions$.pipe(
    ofType<CreateCategory>(CategoryActionsTypes.CREATE_CATEGORY),
    tap(() => {
      this.store.dispatch(new ShowProgressBar());
    }),
    exhaustMap((action: Action) => {
      return this.categoryService.createCategory((action as CreateCategory).category).pipe(
        map((category: Category) => {
          return new CreateCategorySuccess(category);
        }),
        catchError((error) => {
          return of(new CreateCategoryFailure(error));
        })
      );
    })
  );

  @Effect()
  DeleteCategory = this.actions$.pipe(
    ofType<DeleteCategory>(CategoryActionsTypes.DELETE_CATEGORY),
    tap(() => {
      this.store.dispatch(new ShowProgressBar());
    }),
    exhaustMap((action: Action) => {
      const category = (action as DeleteCategory).category;
      return this.categoryService.deleteCategory(category).pipe(
        tap(() => {
          this.store.dispatch(new HideProgressBar());
        }),
        map(() => {
          return new DeleteCategorySuccess(category);
        }),
        catchError(() => {
          return of(new DeleteCategoryFailure(category));
        })
      );
    })
  );

  @Effect({dispatch: false})
  DeleteCategoryFailure = this.actions$
    .pipe(
      ofType<DeleteCategoryFailure>(CategoryActionsTypes.DELETE_CATEGORY_FAILURE),
      tap(() => {
        this.store.dispatch(new HideProgressBar());
      }),
      tap((action: DeleteCategoryFailure) => {
        this.snackBarService.openErrorSnackBar('Category deletion failed');
      }),
    );

  @Effect()
  DeleteCategorySuccess = this.actions$
    .pipe(
      ofType<DeleteCategorySuccess>(CategoryActionsTypes.DELETE_CATEGORY_SUCCESS),
      tap((action: DeleteCategorySuccess) => {
        this.snackBarService.openSuccessSnackBar('Category was successfully deleted');
      }),
      map(() => {
        return new LoadAllEventsFromBackend(ProgressIndicatorType.PROGRESS_BAR);
      }),
    );

  @Effect()
  CreateCategorySuccess = this.actions$
    .pipe(
      ofType<CreateCategorySuccess>(CategoryActionsTypes.CREATE_CATEGORY_SUCCESS),
      tap((action: CreateCategorySuccess) => {
        this.snackBarService.openSuccessSnackBar('Category was successfully created');
      }),
      map(() => {
        return new HideProgressBar();
      }),
    );

  @Effect({dispatch: false})
  CreateCategoryFailure = this.actions$
    .pipe(
      ofType<CreateCategoryFailure>(CategoryActionsTypes.CREATE_CATEGORY_FAILURE),
      tap(() => {
        this.store.dispatch(new HideProgressBar());
      }),
      tap((action: CreateCategoryFailure) => {
        this.snackBarService.openErrorSnackBar('Category creation failed');
      }),
    );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private store: Store<AppState>,
    private snackBarService: SnackBarService,
  ) {
  }
}
