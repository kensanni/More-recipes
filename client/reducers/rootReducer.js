import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer
});

export default rootReducer;
