// Action Types
export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST';
export const DELETE_RECIPE_SUCCESSFUL = 'DELETE_RECIPE_SUCCESSFUL';
export const DELETE_RECIPE_ERROR = 'DELETE_RECIPE_ERROR';

// Actions
export const deleteRecipeRequest = recipe => ({
  type: 'DELETE_RECIPE_REQUEST',
  recipe,
  isDeleted: false
});

export const deleteRecipeSuccessful = (responseMessage, recipeId) => ({
  type: 'DELETE_RECIPE_SUCCESSFUL',
  responseMessage,
  recipeId,
  isDeleted: true
});

export const deleteRecipeError = errorMessage => ({
  type: 'DELETE_RECIPE_ERROR',
  errorMessage,
  isDeleted: false
});
