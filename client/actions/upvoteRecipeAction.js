// Action Types
export const UPVOTE_RECIPE_REQUEST = 'UPVOTE_RECIPE_REQUEST';
export const UPVOTE_RECIPE_SUCCESSFUL = 'UPVOTE_RECIPE_SUCCESSFUL';
export const UPVOTE_RECIPE_ERROR = 'UPVOTE_RECIPE_ERROR';
export const INCREMENT_UPVOTE = 'INCREMENT_UPVOTE';
export const DECREMENT_UPVOTE = 'DECREMENT_UPVOTE';

// Actions
export const upvoteRecipeRequest = recipeId => ({
  type: UPVOTE_RECIPE_REQUEST,
  recipeId,
  isUpvoted: false
});

export const upvoteRecipeSuccess = responseMessage => ({
  type: UPVOTE_RECIPE_SUCCESSFUL,
  responseMessage,
  isUpvoted: true
});

export const upvoteRecipeError = errorMessage => ({
  type: UPVOTE_RECIPE_ERROR,
  errorMessage,
  isUpvoted: false
});

export const incrementUpvote = recipeId => ({
  type: INCREMENT_UPVOTE,
  recipeId
});

export const decrementUpvote = recipeId => ({
  type: DECREMENT_UPVOTE,
  recipeId
});
