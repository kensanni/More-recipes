import axios from 'axios';
import { addRecipeRequest, addRecipeError, addRecipeSuccess } from '../actions/addRecipeAction';

const URL = '/api/v1';

/**
 * @description add recipe action
 * @param {*} recipeData
 * @return {*} redux action to be dispatch to the store
 */
export default function addRecipe(recipeData) {
  return (dispatch, getState) => {
    const imageUrl = getState().saveImageToCloud[0].image;
    console.log('ggggggg', imageUrl);
    recipeData.image = imageUrl;
    dispatch(addRecipeRequest(recipeData));
    axios.post(`${URL}/recipes`, recipeData)
      .then((res) => {
        const { message } = res.data;
        dispatch(addRecipeSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(addRecipeError(errors[0].message));
      });
  };
}
