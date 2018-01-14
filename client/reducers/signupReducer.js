import { SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESSFUL } from '../actions/signupAction';

const initialState = [{
  isAuthenticated: '',
  userData: {},
  responseMessage: '',
  errorMessage: ''
}];

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return [{
        userData: action.userData,
        authenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: '',
      },
      ...state,
      ];
    case SIGNUP_SUCCESSFUL:
      return [{
        userData: {},
        authenticated: action.isAuthenticated,
        responseMessage: action.responseMessage,
        errorMessage: '',
      },
      ...state,
      ];
    case SIGNUP_ERROR:
      return [{
        userData: {},
        authenticated: action.isAuthenticated,
        responseMessage: '',
        errorMessage: action.errorMessage,
      },
      ...state,
      ];
    default:
      return state;
  }
};
export default signupReducer;
