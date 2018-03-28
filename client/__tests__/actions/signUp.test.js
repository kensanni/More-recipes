import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import signupAction from '../../actionController/signup';
import mocklocalStorage from '../__mocks__/localStorage';
import mockData from '../__mocks__/userData.json';
import * as actions from '../../actions/signupAction';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.localStorage = mocklocalStorage;

const {
  validRegistration, authError
} = mockData.Users;

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

describe('Async action', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Signup', () => {
    it('dispatches successful action for a successful request', async () => {
      const token = jwt.sign(validRegistration, 'SOME_SECRET');

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            token,
            message: 'Account successfully created'
          }
        });
      });

      const expectedActions = [
        actions.signupRequest(validRegistration),
        actions.signupSuccess('Account successfully created', validRegistration)
      ];

      await store.dispatch(signupAction(validRegistration));
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
                  message: 'All fields are required'
                }
              ]
            }
          }
        });
      });

      const expectedActions = [
        actions.signupRequest({ name: 'kenny' }),
        actions.signupError('All fields are required')
      ];

      await store.dispatch(signupAction(authError));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

