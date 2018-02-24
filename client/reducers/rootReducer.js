import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import recipeReducer from './recipeReducer';

/**
 * @description make all reducers into a single reducer function which are passed to createstore
 */
const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  recipeReducer
});

export default rootReducer;
