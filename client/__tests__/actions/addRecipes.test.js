import * as actions from '../../actions/addRecipeAction';

describe('Add recipe Action', () => {
  describe('Initiate add recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeData = {};
      const actionResults = actions.addRecipeRequest(recipeData);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_REQUEST,
        recipeData,
        isAdded: false,
      });
    });
  });
  describe('Receive add recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = 'Recipe successfully added';
      const newRecipeData = {};
      const actionResults = actions.addRecipeSuccess(responseMessage, newRecipeData);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_SUCCESSFUL,
        responseMessage,
        newRecipeData,
        isAdded: true,
      });
    });
  });
  describe('Receive add recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.addRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_ERROR,
        errorMessage,
        isAdded: false,
      });
    });
  });
});
