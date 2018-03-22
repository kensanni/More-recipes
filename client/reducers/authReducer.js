import { SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESSFUL } from '../actions/signupAction';
import { SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESSFUL } from '../actions/signinAction';
import { SIGNOUT_USER } from '../actions/signOutAction';

const initialState = {
  isAuthenticated: false,
  userData: {},
  responseMessage: '',
  errorMessage: ''
};

/**
 * @description authentication reducer
 *
 * @param {object} state - default application state
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: '',
      };
    case SIGNUP_SUCCESSFUL:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: action.responseMessage,
        errorMessage: '',
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        userData: {},
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: action.errorMessage,
      };
    case SIGNIN_REQUEST:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: '',
      };
    case SIGNIN_SUCCESSFUL:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: action.responseMessage,
        errorMessage: '',
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        userData: {},
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: action.errorMessage,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        userData: action.userData,
        isAuthenticated: action.isAuthenticated
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
