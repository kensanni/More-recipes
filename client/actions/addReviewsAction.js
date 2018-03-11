export const ADD_REVIEWS_REQUEST = 'ADD_REVIEWS_REQUEST';
export const ADD_REVIEWS_SUCCESSFUL = 'ADD_REVIEWS_SUCCESSFUL';
export const ADD_REVIEWS_ERROR = 'ADD_REVIEWS_ERROR';

export const addReviewsRequest = (recipeId, review) => ({
  type: ADD_REVIEWS_REQUEST,
  isAdded: false,
  review,
  recipeId
});

export const addReviewsSuccessful = (responseMessage, review) => ({
  type: ADD_REVIEWS_SUCCESSFUL,
  isAdded: true,
  responseMessage,
  review
});

export const addReveiwsError = errorMessage => ({
  type: ADD_REVIEWS_ERROR,
  isAdded: false,
  errorMessage,
});
