// Action Types
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

// Action Creators
export const signupRequest = userData => ({
  type: SIGNUP_REQUEST,
  userData,
  isAuthenticated: false,
});
export const signupSuccess = responseMessage => ({
  type: SIGNUP_SUCCESSFUL,
  responseMessage,
  isAuthenticated: true,
});
export const signupError = errorMessage => ({
  type: SIGNUP_ERROR,
  errorMessage,
  isAuthenticated: false,
});

