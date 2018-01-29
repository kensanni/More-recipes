import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import addRecipeReducer from './addRecipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';
import deleteRecipeReducer from './deleteRecipeReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer,
  getUserRecipeReducer,
  addRecipeReducer,
  deleteRecipeReducer
});

export default rootReducer;
