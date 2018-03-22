import localStorage from 'mock-local-storage';
import addReviewReducer from '../../reducers/addReviewsReducer';
import * as types from '../../actions/addReviewsAction';

global.window = {};
window.localStorage = localStorage;

const initialState = {
  isAdded: false,
  review: '',
  errorMessage: ''
};

describe('Add reviews reducer', () => {
  it('should return the initial state', () => {
    const newState = addReviewReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  it('should handle ADD_REVIEWS_REQUEST', () => {
    const recipeId = 2;
    const newState = addReviewReducer(initialState, types.addReviewsRequest(recipeId, ''));
    expect(newState).toEqual(initialState);
  });
  it('should handle ADD_REVIEWS_SUCCESSFUL', () => {
    const review = 'Hi, there';
    const username = 'sannikay';
    const createdAt = 13247482;

    const newState = addReviewReducer(
      initialState,
      types.addReviewsSuccessful(review, username, createdAt)
    );
    expect(newState).toEqual({
      isAdded: true,
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
    });
  });
});
