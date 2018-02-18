import axios from 'axios';
import { getUserRecipeRequest, getUserRecipeSuccessful, getUserRecipeError } from '../actions/getUserRecipeAction';

const URL = '/api/v1';

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
    axios.get(`${URL}/recipes/users/${userId}`)
      .then((userRecipe) => {
        const { recipesData } = userRecipe.data;
        dispatch(getUserRecipeSuccessful(recipesData));
      })
      .catch((errors) => {
        dispatch(getUserRecipeError(errors[0].message));
      });
  };
}
