import upvoteReducer from '../../reducers/upvoteRecipeReducer';
import * as types from '../../actions/upvoteRecipeAction';

const initialState = {
  isUpvoted: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
};

describe('upvote recipe reducer', () => {
  it('Should return the initial state', () => {
    const newState = upvoteReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });
  it('should handle UPVOTE_RECIPE_REQUEST', () => {
    const recipeId = undefined;
    const newState = upvoteReducer(initialState, types.upvoteRecipeRequest(recipeId));
    expect(newState).toEqual({
      recipeId,
      isUpvoted: false,
      responseMessage: '',
      errorMessage: '',
    });
  });
  it('should handle UPVOTE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully upvoted'
    const recipeId = undefined;    
    const newState = upvoteReducer(initialState, types.upvoteRecipeSuccess(responseMessage));
    expect(newState).toEqual({
      recipeId,
      isUpvoted: true,
      responseMessage,
      errorMessage: '',
    });
  });
  it('should handle UPVOTE_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue'
    const recipeId = null;    
    const newState = upvoteReducer(initialState, types.upvoteRecipeError(errorMessage));
    expect(newState).toEqual({
      recipeId,
      isUpvoted: false,
      responseMessage: '',
      errorMessage,
    });
  });
});
