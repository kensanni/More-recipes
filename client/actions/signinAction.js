export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

export const signinRequest = userData => ({
  type: SIGNIN_REQUEST,
  userData,
  isAuthenticated: false
});
export const signinSuccess = responseMessage => ({
  type: SIGNIN_SUCCESSFUL,
  responseMessage,
  isAuthenticated: true
});
export const signinError = errorMessage => ({
  type: SIGNIN_ERROR,
  errorMessage,
  isAuthenticated: false
});
