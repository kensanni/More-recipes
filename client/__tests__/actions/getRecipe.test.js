import * as actions from '../../actions/getRecipeAction';

describe('Get recipe Action', () => {
  describe('Initiate get recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_REQUEST,
        isFetched: false,
      });
    });
  });
  describe('Receive get recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const page = null;
      const actionResults = actions.getRecipeSuccess(recipeData, page);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_SUCCESSFUL,
        recipeData,
        isFetched: true,
        page
      });
    });
  });
  describe('Receive get recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_ERROR,
        errorMessage,
        isFetched: false,
      });
    });
  });
});
