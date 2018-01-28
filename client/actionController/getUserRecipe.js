import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getUserRecipeRequest, getUserRecipeSuccessful, getUserRecipeError } from '../actions/getUserRecipeAction';
import Helper from '../Helpers/helper';

const URL = '/api/v1';

/**
 * @description get recipes belonging to a particular user
 * @param {*} recipe
 * @returns {*} redux action to be dispatch to the store
 */
export default function getUserRecipe(userId) {
  return (dispatch) => {
    console.log("GOT HERE", userId);
    dispatch(getUserRecipeRequest());
    // console.log("@@@@@@@@@@@@@@", userRecipe);
    axios.get(`${URL}/recipes/users/${userId}`)
      .then((userRecipe) => {
        console.dir(userRecipe);
        // console.log("@@@@@@@@@@@@@@", userRecipe)
        const { recipesData } = userRecipe.data;
        dispatch(getUserRecipeSuccessful(recipesData));
      })
      .catch((errors) => {
        dispatch(getUserRecipeError(errors[0].message));
      });
  };
}
