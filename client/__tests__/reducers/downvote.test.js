import downvoteReducer from '../../reducers/downvoteRecipeReducer';
import * as types from '../../actions/downvoteRecipeAction';

const initialState = {
  isDownvoted: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};

describe('Downvote recipe reducer', () => {
  it('Should return the initial state', () => {
    const newState = downvoteReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should handle DOWNVOTE_RECIPE_REQUEST', () => {
    const recipeId = undefined;
    const newState = downvoteReducer(initialState, types.downvoteRecipeRequest(recipeId));
    expect(newState).toEqual({
      recipeId,
      isDownvoted: false,
      responseMessage: '',
      errorMessage: '',
    });
  });
  it('should handle DOWNVOTE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully downvoted';
    const recipeId = undefined;
    const newState = downvoteReducer(initialState, types.downvoteRecipeSuccess(responseMessage));
    expect(newState).toEqual({
      recipeId,
      isDownvoted: true,
      responseMessage,
      errorMessage: '',
    });
  });
  it('should handle DOWNVOTE_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const recipeId = undefined;
    const newState = downvoteReducer(initialState, types.downvoteRecipeError(errorMessage));
    expect(newState).toEqual({
      recipeId,
      isDownvoted: false,
      responseMessage: '',
      errorMessage,
    });
  });
});
