import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import addRecipeReducer from './addRecipeReducer';
import saveImageToCloud from './saveImageToCloudReducer';
import editRecipeReducer from './editRecipeReducer';
import recipeReducer from './recipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';


/**
 * @description make all reducers into a single reducer function which are passed to createstore
 */
const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  addRecipeReducer,
  saveImageToCloud,
  recipeReducer,
  editRecipeReducer,
  getUserRecipeReducer
});

export default rootReducer;
