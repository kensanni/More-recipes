import * as actions from '../../actions/editRecipeAction';

describe('Edit recipe Action', () => {
  describe('Initiate edit recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const recipeData = {};
      const actionResults = actions.editRecipeRequest(recipeId, recipeData);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_REQUEST,
        recipeId,
        recipeData,
        isEdited: false,
      });
    });
  });
  describe('Receive edit recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeId = null;
      const recipeData = {};
      const actionResults = actions.editRecipeSuccess(recipeId, recipeData);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_SUCCESSFUL,
        recipeData,
        recipeId
      });
    });
  });
  describe('Receive edit recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.editRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_ERROR,
        errorMessage,
        isEdited: false
      });
    });
  });
  describe('Check edit recipe status', () => {
    it('should create an action to check edit recipe status', () => {
      const status = null;
      const message = '';
      const actionResults = actions.editRecipeStatus(status, message);
      expect(actionResults).toEqual({
        type: actions.EDIT_RECIPE_STATUS,
        status,
        message
      });
    });
  });
});
