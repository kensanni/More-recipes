import getPopularRecipeReducer from '../../reducers/getPopularRecipeReducer';
import * as types from '../../actions/getPopularRecipeAction';
import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  popularRecipesData: [],
  errorMessage: ''
};

describe('Get popular recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = getPopularRecipeReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_POPULAR_RECIPE_REQUEST', () => {
    const newState = getPopularRecipeReducer(initialState, types.getPopularRecipeRequest());
    expect(newState).toEqual({
      isFetched: false,
      popularRecipesData: [],
      errorMessage: ''
    });
  });
  it('should handle GET_POPULAR_RECIPE_SUCCESSFUL', () => {
    const newState = getPopularRecipeReducer(initialState, types.getPopularRecipeSuccess([addRecipe]));
    expect(newState).toEqual({
      isFetched: true,
      popularRecipesData: [addRecipe],
      errorMessage: ''
    });
  });
  it('should handle GET_POPULAR_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState = getPopularRecipeReducer(initialState, types.getPopularRecipeError(errorMessage));
    expect(newState).toEqual({
      isFetched: false,
      popularRecipesData: [],
      errorMessage
    });
  });
});
