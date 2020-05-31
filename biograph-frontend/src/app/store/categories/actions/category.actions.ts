import {Category} from '../../../models/Category';
import {Action} from '@ngrx/store';

export enum CategoryActionsTypes {
  CREATE_CATEGORY = '[Categories] Create category',
  CREATE_CATEGORY_SUCCESS = '[Categories] Create category success',
  CREATE_CATEGORY_FAILURE = '[Categories] Create category failure',
  LOAD_ALL_CATEGORIES = '[Categories] Load all categories',
  LOAD_ALL_CATEGORIES_SUCCESS = '[Categories] Load all categories success',
  LOAD_ALL_CATEGORIES_FAILURE = '[Categories] Load all categories failure',
  LOAD_ALL_CATEGORIES_FROM_BACKEND = '[Categories] Load all categories from backend',
}

export class LoadAllCategories implements Action {
  readonly type = CategoryActionsTypes.LOAD_ALL_CATEGORIES;
}

export class CreateCategory implements Action {
  readonly type = CategoryActionsTypes.CREATE_CATEGORY;

  constructor(public category: Category) {
  }
}

export class CreateCategorySuccess implements Action {
  readonly type = CategoryActionsTypes.CREATE_CATEGORY_SUCCESS;

  constructor(public createdCategory: Category) {
  }
}

export class CreateCategoryFailure implements Action {
  readonly type = CategoryActionsTypes.CREATE_CATEGORY_FAILURE;

  constructor(public error: any) {
  }
}

export class LoadAllCategoriesFromBackend implements Action {
  readonly type = CategoryActionsTypes.LOAD_ALL_CATEGORIES_FROM_BACKEND;
}

export class LoadAllCategoriesSuccess implements Action {
  readonly type = CategoryActionsTypes.LOAD_ALL_CATEGORIES_SUCCESS;

  constructor(public categories: Category[]) {
  }
}

export class LoadAllCategoriesFailure implements Action {
  readonly type = CategoryActionsTypes.LOAD_ALL_CATEGORIES_FAILURE;
}


export type AnyCategoryAction =
  | LoadAllCategories
  | LoadAllCategoriesFromBackend
  | CreateCategorySuccess
  | CreateCategoryFailure
  | LoadAllCategoriesSuccess
  | LoadAllCategoriesFailure
  | CreateCategory;
