import instance from '../Helpers/helper';
import { getUserRecipeRequest, getUserRecipeSuccessful, getUserRecipeError } from '../actions/getUserRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {number} userId
 * @param {number} page
 *
 * @returns {void} action to be dispatch to the store
 */
export default function getUserRecipe(userId, page) {
  return (dispatch) => {
    dispatch(getUserRecipeRequest());
    return instance.get(`/users/${userId}/recipes?page=${page}`)
      .then((userRecipe) => {
        const { recipesData, pages, count } = userRecipe.data;
        dispatch(getUserRecipeSuccessful(recipesData, pages, count));
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(getUserRecipeError(message));
      });
  };
}
