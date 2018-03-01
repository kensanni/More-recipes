import instance from '../Helpers/helper';
import { getUserRecipeRequest, getUserRecipeSuccessful, getUserRecipeError } from '../actions/getUserRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {userId} userId
 *
 * @returns {undefined} redux action to be dispatch to the store
 */
export default function getUserRecipe(userId) {
  return (dispatch) => {
    dispatch(getUserRecipeRequest());
    instance.get(`/users/${userId}/recipes`)
      .then((userRecipe) => {
        const { recipesData } = userRecipe.data;
        dispatch(getUserRecipeSuccessful(recipesData));
      })
      .catch((errors) => {
        dispatch(getUserRecipeError(errors[0].message));
      });
  };
}
