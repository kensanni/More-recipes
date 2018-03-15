import * as actions from '../../actions/signupAction';

describe('Signup Action', () => {
  describe('Initiate signup action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.signupRequest();
      expect(actionResults).toEqual({
        type: actions.SIGNUP_REQUEST,
        userData: undefined,
        isAuthenticated: false,
      });
    });
  });
  describe('Receive signup action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = 'Signup successful';
      const actionResults = actions.signupSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.SIGNUP_SUCCESSFUL,
        responseMessage,
        isAuthenticated: true,
      });
    });
  });
  describe('Receive signup action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = 'Username not valid';
      const actionResults = actions.signupError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.SIGNUP_ERROR,
        errorMessage,
        isAuthenticated: false,
      });
    });
  });
});
