import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import addRecipeReducer from './addRecipeReducer';


/**
 * @description make all reducers into a single reducer function which are passed to createstore
 */
const rootReducer = combineReducers({
  signupReducer,
  signinReducer,
  addRecipeReducer
});

export default rootReducer;
