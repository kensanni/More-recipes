import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import addRecipeReducer from './addRecipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';
import deleteRecipeReducer from './deleteRecipeReducer';
import saveImageToCloud from './saveImageToCloudReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer,
  getUserRecipeReducer,
  addRecipeReducer,
  deleteRecipeReducer,
  saveImageToCloud
});

export default rootReducer;
