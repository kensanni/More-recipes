import axios from 'axios';
import { getRecipeRequest, getRecipeSuccess, getRecipeError } from '../actions/getRecipeAction';

const URL = '/api/v1';

/**
 * @description get all recipe's action
 * @param {*} recipe
 * @return {*} Redux action to be dispatch to the store
 */
export default function getRecipe() {
  return (dispatch) => {
    dispatch(getRecipeRequest());
    axios.get(`${URL}/recipes`)
      .then((recipes) => {
        const { recipesData } = recipes.data;
        dispatch(getRecipeSuccess(recipesData));
      })
      .catch((errors) => {
        dispatch(getRecipeError(errors[0].message));
      });
  };
}