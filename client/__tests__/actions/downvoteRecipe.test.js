import * as actions from '../../actions/downvoteRecipeAction';

describe('Downvote recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipe = null;
      const actionResults = actions.downvoteRecipeRequest(recipe);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_REQUEST,
        recipe,
        isDownvoted: false
      });
    });
  });
  describe('Receive downvote recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const actionResults = actions.downvoteRecipeSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_SUCCESSFUL,
        responseMessage,
        isDownvoted: true
      });
    });
  });
  describe('Receive downvote action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.downvoteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_ERROR,
        errorMessage,
        isDownvoted: false
      });
    });
    describe('Receive downvote action to increment recipe', () => {
      it('should create an action to increment downvote', () => {
        const recipeId = null;
        const actionResults = actions.incrementDownvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.INCREMENT_DOWNVOTE,
          recipeId,
        });
      });
    });
    describe('Receive downvote action error to decrement recipe', () => {
      it('should create an action to decrement downvote', () => {
        const recipeId = null;
        const actionResults = actions.decrementDownvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.DECREMENT_DOWNVOTE,
          recipeId,
        });
      });
    });
  });
});
