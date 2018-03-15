import * as actions from '../../actions/getUserRecipeAction';

describe('Get user recipes Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getUserRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_REQUEST,
        isFetched: false,
        isFetching: true
      });
    });
  });
  describe('Receive get user recipes action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const page = [];
      const count = null;
      const actionResults = actions.getUserRecipeSuccessful(recipeData, page, count);
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_SUCCESSFUL,
        isFetched: true,
        isFetching: false,
        recipeData,
        page,
        count
      });
    });
  });
  describe('Receive get user recipes action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getUserRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_ERROR,
        isFetched: false,
        isFetching: false,
        errorMessage
      });
    });
  });
});
