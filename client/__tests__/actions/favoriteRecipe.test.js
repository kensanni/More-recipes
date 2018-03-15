import * as actions from '../../actions/favoriteRecipeAction';

describe('Favorite recipes Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.favoriteRecipeRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_REQUEST,
        recipeId,
        isFavorited: false
      });
    });
  });
  describe('Receive favorite recipes action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeId = null;
      const message = '';
      const favoriteType = null;

      const actionResults = actions.favoriteRecipeSuccess(recipeId, message, favoriteType);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_SUCCESSFUL,
        recipeId,
        favoriteType,
        message,
        isFavorited: true
      });
    });
  });
  describe('Receive favorite action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.favoriteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_ERROR,
        errorMessage,
        isFavorited: false
      });
    });
  });
});
