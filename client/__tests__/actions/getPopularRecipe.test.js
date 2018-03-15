import * as actions from '../../actions/getPopularRecipeAction';

describe('Get popular recipe Action', () => {
  describe('Initiate get popular recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getPopularRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_REQUEST,
        isFetched: false
      });
    });
  });
  describe('Receive get popular recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const popularRecipesData = [];
      const actionResults = actions.getPopularRecipeSuccess(popularRecipesData);
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_SUCCESSFUL,
        popularRecipesData,
        isFetched: true
      });
    });
  });
  describe('Receive get popular recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getPopularRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_ERROR,
        errorMessage,
        isFetched: false,
      });
    });
  });
});
