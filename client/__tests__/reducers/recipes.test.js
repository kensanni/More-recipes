import getAllRecipesReducer from '../../reducers/recipeReducer';
import * as types from '../../actions/getRecipeAction';


import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  recipeData: [],
  errorMessage: '',
  page: 0
};

describe('Get all recipes reducer', () => {
  it('should return the initial state', () => {
    const newState = getAllRecipesReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_RECIPE_REQUEST', () => {
    const newState = getAllRecipesReducer(initialState, types.getRecipeRequest());
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      recipeData: [],
      errorMessage: ''
    });
  });
  it('should handle GET_RECIPE_SUCCESSFUL', () => {
    const page = 3;
    const newState =
      getAllRecipesReducer(
        initialState,
        types.getRecipeSuccess([addRecipe], page)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      recipeData: [addRecipe],
      errorMessage: '',
      page,
    });
  });
  it('should handle GET_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState = getAllRecipesReducer(initialState, types.getRecipeError(errorMessage));
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      recipeData: [],
      errorMessage
    });
  });
});
