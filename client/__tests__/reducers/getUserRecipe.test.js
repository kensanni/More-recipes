import getUserRecipeReducer from '../../reducers/getUserRecipeReducer';
import { SET_EDIT_RECIPE_ID, setEditRecipeIdAction } from '../../actionController/editRecipe';
import * as types from '../../actions/getUserRecipeAction';
import * as deleteTypes from '../../actions/deleteRecipeAction';
import * as addTypes from '../../actions/addRecipeAction';
import * as editTypes from '../../actions/editRecipeAction';

import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  recipeData: [],
  editRecipeId: null,
  errorMessage: '',
  page: 0,
  isFetching: true,
};

describe('Get user recipes reducer', () => {
  it('should return the initial state', () => {
    const newState = getUserRecipeReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_USER_RECIPE_REQUEST', () => {
    const newState = getUserRecipeReducer(initialState, types.getUserRecipeRequest());
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      isFetching: true,
      recipeData: [],
      errorMessage: '',
    });
  });
  it('should handle GET_USER_RECIPE_SUCCESSFUL', () => {
    const page = 3;
    const count = 10;

    const newState =
      getUserRecipeReducer(
        initialState,
        types.getUserRecipeSuccessful([addRecipe], page, count)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      isFetching: false,
      recipeData: [addRecipe],
      errorMessage: '',
      page,
      count
    });
  });
  it('should handle GET_USER_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const page = 0;
    const newState = getUserRecipeReducer(initialState, types.getUserRecipeError(errorMessage));
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      isFetching: false,
      recipeData: [],
      errorMessage,
      page
    });
  });
  it('should handle DELETE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully deleted';
    const recipeId = 0;
    const newState =
      getUserRecipeReducer(
        initialState,
        deleteTypes.deleteRecipeSuccessful(responseMessage, recipeId)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      recipeData: [],
      errorMessage: ''
    });
  });
  it('should handle ADD_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully added';
    const newState = getUserRecipeReducer(
      initialState,
      addTypes.addRecipeSuccess(responseMessage, addRecipe)
    );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      recipeData: [addRecipe],
      errorMessage: ''
    });
  });
  it('should handle EDIT_RECIPE_SUCCESSFUL', () => {
    const recipeId = 5;
    const newState =
      getUserRecipeReducer(
        initialState,
        editTypes.editRecipeSuccess(recipeId, addRecipe)
      );
    expect(newState).toEqual({
      ...initialState,
      recipeData: [],
    });
  });
  it('should handle SET_EDIT_RECIPE_ID', () => {
    const recipeId = 5;
    const newState =
      getUserRecipeReducer(
        initialState,
        setEditRecipeIdAction(recipeId)
      );
    expect(newState).toEqual({
      ...initialState,
      editRecipeId: recipeId,
    });
  });
});
