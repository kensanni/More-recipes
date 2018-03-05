import instance from '../Helpers/helper';
import { getUserRecipeRequest, getUserRecipeSuccessful, getUserRecipeError } from '../actions/getUserRecipeAction';

/**
 * @description action creator for adding recipe
 *
 * @param {userId} userId
 *
 * @param {number} page
 *
 * @returns {undefined} redux action to be dispatch to the store
 */
export default function getUserRecipe(userId, page) {
  console.log("user id =====>",userId, page);
  return (dispatch) => {
    dispatch(getUserRecipeRequest());
    instance.get(`/users/${userId}/recipes?page=${page}`)
      .then((userRecipe) => {
        const { recipesData, pages } = userRecipe.data;
        dispatch(getUserRecipeSuccessful(recipesData, pages));
      })
      .catch((errors) => {
        dispatch(getUserRecipeError(errors[0].message));
      });
  };
}
