import * as actions from '../../actions/getRecipeDetailsAction';

describe('Get recipe details recipe Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.getRecipeDetailsRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_REQUEST,
        recipeId,
        isFetched: false
      });
    });
  });
  describe('Receive get recipe details action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeDetails = {};
      const actionResults = actions.getRecipeDetailsSuccessful(recipeDetails);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_SUCCESSFUL,
        recipeDetails,
        isFetched: true
      });
    });
  });
  describe('Receive get recipe details action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getRecipeDetailsError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_ERROR,
        errorMessage,
        isFetched: false,
      });
    });
  });
});
