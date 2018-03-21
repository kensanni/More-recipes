import getRecipeDetailsReducer from '../../reducers/getRecipeDetailsReducer';
import * as types from '../../actions/getRecipeDetailsAction';
import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  recipeDetails: {},
  recipeDetailStatus: null,
  errorMessage: ''
};

describe('Get recipe details reducer', () => {
  it('should return the initial state', () => {
    const newState = getRecipeDetailsReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_POPULAR_RECIPE_REQUEST', () => {
    const newState = getRecipeDetailsReducer(initialState, types.getRecipeDetailsRequest());
    expect(newState).toEqual({
      isFetched: false,
      recipeDetails: {},
      recipeDetailStatus: 'fetching',
      errorMessage: ''
    });
  });
  it('should handle GET_POPULAR_RECIPE_SUCCESSFUL', () => {
    const newState = getRecipeDetailsReducer(initialState, types.getRecipeDetailsSuccessful(addRecipe));
    expect(newState).toEqual({
      isFetched: true,
      recipeDetails: addRecipe,
      recipeDetailStatus: 'fetched',
      errorMessage: ''
    });
  });
  it('should handle GET_POPULAR_RECIPE_ERROR', () => {
    const errorMessage = 'Recipe not found ';
    const newState = getRecipeDetailsReducer(initialState, types.getRecipeDetailsError(errorMessage));
    expect(newState).toEqual({
      isFetched: false,
      recipeDetails: {},
      recipeDetailStatus: 'error',
      errorMessage
    });
  });
});
