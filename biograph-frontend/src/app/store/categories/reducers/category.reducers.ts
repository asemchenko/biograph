import {AnyAuthAction, AuthActionTypes} from '../../auth/actions/auth.actions';
import {Category} from '../../../models/Category';
import {
  AnyCategoryAction,
  CategoryActionsTypes,
  CreateCategorySuccess,
  DeleteCategorySuccess,
  LoadAllCategoriesSuccess
} from '../actions/category.actions';

export interface CategoriesState {
  isLoaded: boolean;
  categories: Category[];
}

export const initialState: CategoriesState = {
  isLoaded: false,
  categories: [],
};


export function reducer(state = initialState, action: AnyCategoryAction | AnyAuthAction): CategoriesState {
  switch (action.type) {
    case CategoryActionsTypes.LOAD_ALL_CATEGORIES_SUCCESS:
      return {isLoaded: true, categories: (action as LoadAllCategoriesSuccess).categories};
    case CategoryActionsTypes.LOAD_ALL_CATEGORIES_FAILURE:
      return {isLoaded: false, categories: []};
    case CategoryActionsTypes.CREATE_CATEGORY_SUCCESS:
      return {isLoaded: true, categories: [...state.categories, (action as CreateCategorySuccess).createdCategory]};
    case CategoryActionsTypes.DELETE_CATEGORY_SUCCESS:
      return {
        isLoaded: true,
        categories: [...state.categories.filter(c => c.categoryId !== (action as DeleteCategorySuccess).category.categoryId)]
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    default: {
      return state;
    }
  }
}


export const getAllCategories = (state: CategoriesState) => state.categories;
