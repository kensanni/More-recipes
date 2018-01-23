export const UPVOTE_RECIPE_REQUEST = 'UPVOTE_RECIPE_REQUEST';
export const UPVOTE_RECIPE_SUCCESSFUL = 'UPVOTE_RECIPE_SUCCESSFUL';
export const UPVOTE_RECIPE_ERROR = 'UPVOTE_RECIPE_ERROR';

export const upvoteRecipeRequest = recipe => ({
  type: UPVOTE_RECIPE_REQUEST,
  recipe,
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
