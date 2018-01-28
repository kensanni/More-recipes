import { SIGNIN_ERROR, SIGNIN_REQUEST, SIGNIN_SUCCESSFUL } from '../actions/signinAction';

const initialState = [{
  isAuthenticated: false,
  userData: {},
  responseMessage: '',
  errorMessage: ''
}];
/**
 * @description sign reducer
 * @param {object} state - default application state
 * @param {object} action - response from the api
 * @return {Object} - Object containg new state
 */
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return [{
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: '',
      },
      ...state
      ];
    case SIGNIN_SUCCESSFUL:
      return [{
        userData: action.userData,
        isAuthenticated: action.isAuthenticated,
        responseMessage: action.responseMessage,
        errorMessage: '',
      },
      ...state
      ];
    case SIGNIN_ERROR:
      return [{
        userData: {},
        isAuthenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: action.errorMessage,
      },
      ...state
      ];
    default:
      return state;
  }
};

export default signinReducer;
