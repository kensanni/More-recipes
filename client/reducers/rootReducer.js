import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import addRecipeReducer from './addRecipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';
import deleteRecipeReducer from './deleteRecipeReducer';
import editRecipeReducer from './editRecipeReducer';
import saveImageToCloud from './saveImageToCloudReducer';
import getUserFavoriteRecipeReducer from './getUserFavoriteRecipeReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer,
  getUserRecipeReducer,
  addRecipeReducer,
  deleteRecipeReducer,
  editRecipeReducer,
  saveImageToCloud,
  getUserFavoriteRecipeReducer
});

export default rootReducer;
