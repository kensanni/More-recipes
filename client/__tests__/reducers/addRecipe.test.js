import addRecipeReducer from '../../reducers/addRecipeReducer';
import * as types from '../../actions/addRecipeAction';
import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isAdded: false,
  recipeData: [],
  responseMessage: '',
  errorMessage: ''
};

describe('Add recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = addRecipeReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle ADD_RECIPE_REQUEST', () => {
    const newState = addRecipeReducer(initialState, types.addRecipeRequest({}));
    expect(newState).toEqual({
      isAdded: false,
      recipeData: [],
      responseMessage: '',
      errorMessage: ''
    });
  });
  it('should handle ADD_RECIPE_SUCCESS', () => {
    const message = 'Recipe succesfully added';
    const newState = addRecipeReducer(initialState, types.addRecipeSuccess(message, [addRecipe]));
    expect(newState).toEqual({
      isAdded: true,
      recipeData: [],
      responseMessage: message,
      errorMessage: ''
    });
  });
  it('should handle ADD_RECIPE_ERROR', () => {
    const errorMessage = 'All fields are required';
    const newState = addRecipeReducer(initialState, types.addRecipeError(errorMessage));
    expect(newState).toEqual({
      isAdded: false,
      recipeData: [],
      responseMessage: '',
      errorMessage,
    });
  });
});
