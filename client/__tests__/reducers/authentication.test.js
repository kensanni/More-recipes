import authReducer from '../../reducers/authReducer';
import * as signupTypes from '../../actions/signupAction';
import * as signinTypes from '../../actions/signinAction';
import signOutUser from '../../actions/signOutAction';
import mockData from '../__mocks__/userData.json';
import mocklocalStorage from '../__mocks__/localStorage';

window.localStorage = mocklocalStorage;


const {
  validSignin
} = mockData.Users;

const initialState = {
  isAuthenticated: false,
  userData: {},
  responseMessage: '',
  errorMessage: ''
};

describe.only('Authentication reducer', () => {
  it('should return the initial state', () => {
    const newState = authReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle SIGNUP_REQUEST', () => {
    const newState = authReducer(initialState, signupTypes.signupRequest({}));
    expect(newState).toEqual({
      userData: {},
      isAuthenticated: false,
      responseMessage: '',
      errorMessage: '',
    });
  });
  it('should handle SIGNUP_SUCCESSFUL', () => {
    const newState = authReducer(initialState, signupTypes.signupSuccess('Account succesfully created', validSignin));
    expect(newState).toEqual({
      userData: validSignin,
      isAuthenticated: true,
      responseMessage: 'Account succesfully created',
      errorMessage: '',
    });
  });
  it('should handle SIGNUP_ERROR', () => {
    const newState = authReducer(initialState, signupTypes.signupError('Username already exist'));
    expect(newState).toEqual({
      userData: {},
      isAuthenticated: false,
      responseMessage: '',
      errorMessage: 'Username already exist',
    });
  });
  it('should handle SIGNIN_REQUEST', () => {
    const newState = authReducer(initialState, signinTypes.signinRequest(validSignin));
    expect(newState).toEqual({
      userData: validSignin,
      isAuthenticated: false,
      responseMessage: '',
      errorMessage: '',
    });
  });
  it('should handle SIGNIN_SUCCESS', () => {
    const newState = authReducer(initialState, signinTypes.signinSuccess('Login successful', validSignin));
    expect(newState).toEqual({
      userData: validSignin,
      isAuthenticated: true,
      responseMessage: 'Login successful',
      errorMessage: '',
    });
  });
  it('should handle SIGNIN_ERROR', () => {
    const newState = authReducer(initialState, signinTypes.signinError('Incorrect login details'));
    expect(newState).toEqual({
      userData: {},
      isAuthenticated: false,
      responseMessage: '',
      errorMessage: 'Incorrect login details',
    });
  });
  it('should handle SIGNOUT_USER', () => {
    const newState = authReducer(initialState, signOutUser());
    expect(newState).toEqual({
      ...initialState,
      userData: {},
      isAuthenticated: false,
    });
  });
});
