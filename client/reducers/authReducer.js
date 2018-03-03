import { SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESSFUL } from '../actions/signupAction';
import { SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESSFUL } from '../actions/signinAction';


const initialState = {
  isAuthenticated: '',
  userData: {},
  responseMessage: '',
  errorMessage: ''
};

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
        userData: {},
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
    default:
      return state;
  }
};

export default authReducer;
