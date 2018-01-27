import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';
import getUserRecipeReducer from './getUserRecipeReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer,
  getUserRecipeReducer
});

export default rootReducer;
