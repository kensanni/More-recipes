import * as actions from '../../actions/signinAction';

describe('Signin Action', () => {
  describe('Initiate signin action request', () => {
    it('should create an action to initiate a request', () => {
      const userData = {};
      const actionResults = actions.signinRequest(userData);
      expect(actionResults).toEqual({
        type: actions.SIGNIN_REQUEST,
        userData,
        isAuthenticated: false,
      });
    });
  });
  describe('Receive signin action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = 'Signin successful';
      const actionResults = actions.signinSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.SIGNIN_SUCCESSFUL,
        responseMessage,
        isAuthenticated: true,
      });
    });
  });
  describe('Receive signin action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = 'Incorrect login details';
      const actionResults = actions.signinError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.SIGNIN_ERROR,
        errorMessage,
        isAuthenticated: false,
      });
    });
  });
});
