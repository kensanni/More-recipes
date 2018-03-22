import getAllReviewsReducer from '../../reducers/getReviewsReducer';
import * as types from '../../actions/getReviewsAction';


import mockData from '../__mocks__/recipeData.json';


const comments = mockData.Recipes.review;


const initialState = {
  isFetched: false,
  reviews: [],
  errorMessage: '',
  pages: 0
};

describe('Get all reviews reducer', () => {
  it('should return the initial state', () => {
    const newState = getAllReviewsReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_REVIEWS_REQUEST', () => {
    const recipeId = 4;
    const newState =
      getAllReviewsReducer(
        initialState,
        types.getReviewsRequest(recipeId)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      reviews: [],
      errorMessage: ''
    });
  });
  it('should handle GET_REVIEWS_SUCCESSFUL', () => {
    const pages = 3;
    const newState =
      getAllReviewsReducer(
        initialState,
        types.getReviewsSuccess([comments], pages)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      reviews: [comments],
      errorMessage: '',
      pages,
    });
  });
  it('should handle GET_NEXT_REVIEWS_SUCCESSFUL', () => {
    const pages = 3;
    const newState =
      getAllReviewsReducer(
        initialState,
        types.getNextReviewsSuccess([comments], pages)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      reviews: [comments],
      errorMessage: '',
      pages,
    });
  });
  it('should handle GET_REVIEWS_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState =
      getAllReviewsReducer(
        initialState,
        types.getReviewsError(errorMessage)
      );
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      reviews: [],
      errorMessage
    });
  });
  it('should handle ADD_REVIEWS_SUCCESSFUL', () => {
    const review = 'Hi, there';
    const username = 'sannikay';
    const createdAt = 13247482;
    const reviewObj = {
      review, username, createdAt
    };

    const newState = getAllReviewsReducer(
      initialState,
      types.addReviewsSuccessful(review, username, createdAt)
    );
    expect(newState).toEqual({
      ...initialState,
      reviews: [reviewObj],
    });
  });
});
