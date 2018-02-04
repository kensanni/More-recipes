export const EDIT_RECIPE_REQUEST = 'EDIT_RECIPE_REQUEST';
export const EDIT_RECIPE_SUCCESSFUL = 'EDIT_RECIPE_SUCCESSFUL';
export const EDIT_RECIPE_ERROR = 'EDIT_RECIPE_ERROR';

export const editRecipeRequest = recipe => ({
  type: EDIT_RECIPE_REQUEST,
  recipe,
  isEdited: false
});

export const editRecipeSuccesful = (responseMessage, recipeId) => ({
  type: EDIT_RECIPE_SUCCESSFUL,
  responseMessage,
  recipeId,
  isEdited: true
});

export const editRecipeError = errorMessage => ({
  type: EDIT_RECIPE_ERROR,
  errorMessage,
  isEdited: false
});
