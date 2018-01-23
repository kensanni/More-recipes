export const FAVORITE_RECIPE_REQUEST = 'FAVORITE_RECIPE_REQUEST';
export const FAVORITE_RECIPE_SUCCESSFUL = 'FAVORITE_RECIPE_SUCCESSFUL';
export const FAVORITE_RECIPE_ERROR = 'FAVORITE_RECIPE_ERROR ';

export const favoriteRecipeRequest = recipeId => ({
  type: FAVORITE_RECIPE_REQUEST,
  recipeId,
  isFavorited: false
});
export const favoriteRecipeSuccess = recipeId => ({
  type: FAVORITE_RECIPE_SUCCESSFUL,
  recipeId,
  isFavorited: true
});
export const favoriteRecipeError = errorMessage => ({
  type: FAVORITE_RECIPE_ERROR,
  errorMessage,
  isFavorited: false
});
