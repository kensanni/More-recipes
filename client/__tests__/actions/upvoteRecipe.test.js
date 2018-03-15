import * as actions from '../../actions/upvoteRecipeAction';

describe('Upvote recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.upvoteRecipeRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_REQUEST,
        recipeId,
        isUpvoted: false
      });
    });
  });
  describe('Receive upvote recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const actionResults = actions.upvoteRecipeSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_SUCCESSFUL,
        responseMessage,
        isUpvoted: true
      });
    });
  });
  describe('Receive upvote action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.upvoteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_ERROR,
        errorMessage,
        isUpvoted: false
      });
    });
    describe('Receive upvote action to increment recipe', () => {
      it('should create an action to increment upvote', () => {
        const recipeId = null;
        const actionResults = actions.incrementUpvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.INCREMENT_UPVOTE,
          recipeId,
        });
      });
    });
    describe('Receive upvote action error to decrement recipe', () => {
      it('should create an action to decrement upvote', () => {
        const recipeId = null;
        const actionResults = actions.decrementUpvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.DECREMENT_UPVOTE,
          recipeId,
        });
      });
    });
  });
});
