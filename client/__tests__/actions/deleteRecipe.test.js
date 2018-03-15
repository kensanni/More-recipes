import * as actions from '../../actions/deleteRecipeAction';

describe('Delete recipe Action', () => {
  describe('Initiate delete recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipe = {};
      const actionResults = actions.deleteRecipeRequest(recipe);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_REQUEST,
        recipe,
        isDeleted: false,
      });
    });
  });
  describe('Receive delete recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const recipeId = null;
      const actionResults = actions.deleteRecipeSuccessful(responseMessage, recipeId);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_SUCCESSFUL,
        responseMessage,
        recipeId,
        isDeleted: true
      });
    });
  });
  describe('Receive delete recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.deleteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.DELETE_RECIPE_ERROR,
        errorMessage,
        isDeleted: false,
      });
    });
  });
});
