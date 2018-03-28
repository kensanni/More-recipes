import localStorage from 'mock-local-storage';
import editRecipeReducer from '../../reducers/editRecipeReducer';
import * as types from '../../actions/editRecipeAction';
import mockData from '../__mocks__/recipeData.json';

const {
  addRecipe
} = mockData.Recipes;

global.window = {};
window.localStorage = global.localStorage;

const initialState = {
  isEdited: false,
  recipeData: {},
  editRecipeStatus: {
    status: null,
    message: null
  },
  errorMessage: ''
};

describe('Edit recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = editRecipeReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should handle EDIT_RECIPE_STATUS', () => {
    const status = 'Edited';
    const message = 'edited';
    const newState = editRecipeReducer(initialState, types.editRecipeStatus(status, message));
    expect(newState).toEqual({
      ...initialState,
      editRecipeStatus: {
        status,
        message,
      }
    });
  });
  it('should handle EDIT_RECIPE_REQUEST', () => {
    const recipeId = 2;
    const newState = editRecipeReducer(initialState, types.editRecipeRequest(recipeId, addRecipe));
    expect(newState).toEqual({
      ...initialState,
      isEdited: false
    });
  });
  it('should handle EDIT_RECIPE_SUCCESSFUL', () => {
    const recipeId = 2;
    const newState = editRecipeReducer(initialState, types.editRecipeSuccess(recipeId, addRecipe));
    expect(newState).toEqual({
      ...initialState,
      isEdited: true,
      recipeData: addRecipe,
      errorMessage: ''
    });
  });
  it('should handle EDIT_RECIPE_ERROR', () => {
    const errorMessage = 'you already have a recipe with the name yam';
    const newState = editRecipeReducer(initialState, types.editRecipeError(errorMessage));
    expect(newState).toEqual({
      ...initialState,
      isEdited: false,
      recipeData: {},
      responseMessage: '',
      errorMessage
    });
  });
});
