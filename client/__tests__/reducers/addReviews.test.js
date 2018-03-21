import addReviewReducer from '../../reducers/addReviewsReducer';
import * as types from '../../actions/addReviewsAction';
import localStorage from 'mock-local-storage';

global.window = {};
window.localStorage = global.localStorage;

const initialState = {
  isAdded: false,
  responseMessage: '',
  review: '',
  errorMessage: ''
};

describe('Add reviews reducer', () => {
  it('should return the initial state', () => {
    const newState = addReviewReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });
  it('should handle ADD_REVIEWS_REQUEST', () => {
    const recipeId = 2;
    const newState = addReviewReducer(initialState, types.addReviewsRequest(recipeId, ''));
    expect(newState).toEqual(initialState);
  });
  it('should handle ADD_REVIEWS_SUCCESSFUL', () => {
    const responseMessage = 'Review posted succesfully';
    const review = 'Hi, there';
    const username = 'sannikay';
    const createdAt = 13247482;

    const newState = addReviewReducer(initialState, types.addReviewsSuccessful(responseMessage, review, username, createdAt));
    expect(newState).toEqual({
      isAdded: true,
      responseMessage,
      review,
      username,
      createdAt,
      errorMessage: ''
    });
  });
  it('should handle ADD_REVIEWS_ERROR', () => {
    const errorMessage = 'Input a review to continue';
    const newState = addReviewReducer(initialState, types.addReveiwsError(errorMessage));
    expect(newState).toEqual({
      isAdded: false,
      review: '',
      errorMessage,
      responseMessage: '',
    });
  });
});
