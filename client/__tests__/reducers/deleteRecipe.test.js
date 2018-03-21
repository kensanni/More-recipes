import deleteRecipeReducer from '../../reducers/deleteRecipeReducer';
import * as types from '../../actions/deleteRecipeAction';

const initialState = {
  isDeleted: false,
  errorMessage: '',
  recipeId: null,
  responseMessage: ''
};

describe('Delete recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = deleteRecipeReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });
  it('should Handle DELETE_RECIPE_REQUEST', () => {
    const newState = deleteRecipeReducer(initialState, types.deleteRecipeRequest(null));
    expect(newState).toEqual({
      isDeleted: false,
      errorMessage: '',
      responseMessage: '',
      recipeId: null,
    });
  });
  it('should Handle DELETE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'recipe successfully deleted';
    const recipeId = 2;

    const newState = deleteRecipeReducer(initialState, types.deleteRecipeSuccessful(responseMessage, recipeId));
    expect(newState).toEqual({
      isDeleted: true,
      errorMessage: '',
      responseMessage,
      recipeId,
    });
  });
  it('should handle DELETE_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState = deleteRecipeReducer(initialState, types.deleteRecipeError(errorMessage));
    expect(newState).toEqual({
      isDeleted: false,
      errorMessage,
      responseMessage: '',
      recipeId: null
    });
  });
});
