import localStorage from 'mock-local-storage';
import favoriteRecipeReducer from '../../reducers/favoriteRecipeReducer';
import * as types from '../../actions/favoriteRecipeAction';

const initialState = {
  isFavorited: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};

describe('Favorite recipe reducer', () => {
  it('Should return the initial state', () => {
    const newState = favoriteRecipeReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should handle FAVORITE_RECIPE_REQUEST', () => {
    const recipeId = 1;
    const newState = favoriteRecipeReducer(initialState, types.favoriteRecipeRequest(recipeId));
    expect(newState).toEqual({
      ...initialState,
      isFavorited: false,
      recipeId,
      responseMessage: '',
      errorMessage: ''
    });
  });
  it('should handle FAVORITE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully favorited'
    const recipeId = 1;
    const favoriteType = 0;
    const newState = favoriteRecipeReducer(initialState, types.favoriteRecipeSuccess(recipeId, responseMessage, favoriteType));
    expect(newState).toEqual({
      recipeId,
      favoriteType,
      isFavorited: true,      
      responseMessage,
      errorMessage: '',
    });
  });
  it('should handle FAVORITE_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue'
    const recipeId = null;    
    const newState = favoriteRecipeReducer(initialState, types.favoriteRecipeError(errorMessage));
    expect(newState).toEqual({
      recipeId: null,
      isFavorited: false,
      responseMessage: '',
      errorMessage,
    });
  });
});
