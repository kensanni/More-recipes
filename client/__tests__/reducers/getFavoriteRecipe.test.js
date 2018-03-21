import getFavoriteRecipeReducer from '../../reducers/getFavoriteRecipeReducer';
import * as types from '../../actions/getFavoriteRecipeAction';
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

describe('Get favorite recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = getFavoriteRecipeReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_FAVORITE_RECIPE_REQUEST', () => {
    const newState = getFavoriteRecipeReducer(initialState, types.getFavoriteRecipeRequest());
    expect(newState).toEqual({
      isFetched: false,
      recipeData: [],
      errorMessage: '',
      page: 0
    });
  });
  it('should handle GET_FAVORITE_RECIPE_SUCCESSFUL', () => {
    const page = 3;
    const count = 10;

    const newState = getFavoriteRecipeReducer(initialState, types.getFavoriteRecipeSuccessful([addRecipe], page, count));
    expect(newState).toEqual({
      isFetched: true,
      recipeData: [addRecipe],
      errorMessage: '',
      page,
      count
    });
  });
  it('should handle GET_FAVORITE_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const page = 0;    
    const newState = getFavoriteRecipeReducer(initialState, types.getFavoriteRecipeError(errorMessage));
    expect(newState).toEqual({
      isFetched: false,
      recipeData: [],
      errorMessage,
      page
    });
  });
});
