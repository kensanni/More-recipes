import * as actions from '../../actions/getFavoriteRecipeAction';

describe('Get favorite recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getFavoriteRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_REQUEST,
        isFetched: false
      });
    });
  });
  describe('Receive get favorite recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const count = null;
      const page = null;
      const actionResults = actions.getFavoriteRecipeSuccessful(recipeData, page, count);
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_SUCCESSFUL,
        recipeData,
        page,
        count,
        isFetched: true
      });
    });
  });
  describe('Receive get favorite recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getFavoriteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_ERROR,
        errorMessage,
        isFetched: false,
      });
    });
  });
});
