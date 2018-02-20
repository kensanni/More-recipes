export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESSFUL = 'SIGNIN_SUCCESSFUL';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

/**
 * @description action for signin request
 *
 * @param {object} userData user login details
 *
 * @returns {undefined}
 */
export const signinRequest = userData => ({
  type: SIGNIN_REQUEST,
  userData,
  isAuthenticated: false
});

/**
 * @description action for signin successful
 *
 * @param {object} responseMessage
 *
 * @param {object} userData
 *
 * @returns {undefined}
 */
export const signinSuccess = (responseMessage, userData) => ({
  type: SIGNIN_SUCCESSFUL,
  responseMessage,
  userData,
  isAuthenticated: true
});

/**
 * @description action for signin error
 *
 * @param {object} errorMessage
 *
 * @returns {undefined}
 */
export const signinError = errorMessage => ({
  type: SIGNIN_ERROR,
  errorMessage,
  isAuthenticated: false
});
