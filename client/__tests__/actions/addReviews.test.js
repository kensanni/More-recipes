import * as actions from '../../actions/addReviewsAction';

describe('Add reviews for recipe Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const review = '';
      const actionResults = actions.addReviewsRequest(recipeId, review);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_REQUEST,
        recipeId,
        review,
        isAdded: false
      });
    });
  });
  describe('Receive add reviews action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const review = '';
      const username = '';
      const createdAt = '';
      const actionResults =
        actions.addReviewsSuccessful(responseMessage, review, username, createdAt);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_SUCCESSFUL,
        responseMessage,
        review,
        username,
        createdAt,
        isAdded: true
      });
    });
  });
  describe('Receive add reviews action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.addReveiwsError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.ADD_REVIEWS_ERROR,
        errorMessage,
        isAdded: false,
      });
    });
  });
});
