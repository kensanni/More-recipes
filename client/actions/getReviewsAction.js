
// Action Types
export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESSFUL = 'GET_REVIEWS_SUCCESSFUL';
export const GET_REVIEWS_ERROR = 'GET_REVIEWS_ERROR';
export const GET_NEXT_REVIEWS_SUCCESSFUL = 'GET_NEXT_REVIEWS_SUCCESSFUL';
export const ADD_REVIEWS_SUCCESSFUL = 'ADD_REVIEWS_SUCCESSFUL';

// Actions
export const getReviewsRequest = recipeId => ({
  type: GET_REVIEWS_REQUEST,
  isFetched: false,
  recipeId
});

export const getReviewsSuccess = (reviews, pages) => ({
  type: GET_REVIEWS_SUCCESSFUL,
  isFetched: true,
  reviews,
  pages
});

export const getReviewsError = errorMessage => ({
  type: GET_REVIEWS_ERROR,
  isFetched: false,
  errorMessage
});

export const getNextReviewsSuccess = (reviews, pages) => ({
  type: GET_NEXT_REVIEWS_SUCCESSFUL,
  isFetched: true,
  reviews,
  pages
});

export const addReviewsSuccessful = (review, username, createdAt) => ({
  type: ADD_REVIEWS_SUCCESSFUL,
  isAdded: true,
  review,
  username,
  createdAt
});
