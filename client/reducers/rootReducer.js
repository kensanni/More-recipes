import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import addRecipeReducer from './addRecipeReducer';
import saveImageToCloud from './saveImageToCloudReducer';
import editRecipeReducer from './editRecipeReducer';
import deleteRecipeReducer from './deleteRecipeReducer';
import recipeReducer from './recipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';
import getPopularRecipeReducer from './getPopularRecipeReducer';

/**
 * @description make all reducers into a single reducer function which are passed to createstore
 */
const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  addRecipeReducer,
  saveImageToCloud,
  recipeReducer,
  deleteRecipeReducer,
  editRecipeReducer,
  getUserRecipeReducer,
  getPopularRecipeReducer
});

export default rootReducer;
