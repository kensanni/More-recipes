import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import mocklocalStorage from '../__mocks__/localStorage';
import signinAction from '../../actionController/signin';
import mockData from '../__mocks__/userData.json';
import * as actions from '../../actions/signinAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.localStorage = mocklocalStorage;

const {
  validSignin, authError
} = mockData.Users;

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

describe('Async action', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Signin', () => {
    it('dispatches successful action for a successful request', async () => {
      const token = jwt.sign(validSignin, 'SOME_SECRET');

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            token,
            message: 'Login successful'
          }
        });
      });

      const expectedActions = [
        actions.signinRequest(validSignin),
        actions.signinSuccess('Login successful', validSignin)
      ];

      await store.dispatch(signinAction(validSignin));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('dispatches error for a failed request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: {
            data: {
              errors: [
                {
                  message: 'Incorrect login details'
                }
              ]
            }
          }
        });
      });

      const expectedActions = [
        actions.signinRequest(authError),
        actions.signinError('Incorrect login details')
      ];

      await store.dispatch(signinAction(authError));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
