import jwt from 'jsonwebtoken';
import axios from 'axios';
import { signinError, signinRequest, signinSuccess } from '../actions/signinAction';

/**
 * @description action creator for users to signin
 *
 * @param {object} userdata user login details
 *
 * @returns {void} action to be dispatch to the store
 */
export default function signin(userdata) {
  return (dispatch) => {
    dispatch(signinRequest(userdata));
    return axios.post('/api/v1/users/signin', userdata)
      .then((res) => {
        const { token, message } = res.data;
        localStorage.setItem('token', token);
        const userinfo = jwt.decode(token);
        dispatch(signinSuccess(message, userinfo));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(signinError(errors[0].message));
      });
  };
}


/**
 * @description action controller to save the userId to store
 *
 * @returns {void} dispatch signinsuccess action
 */
export const signInFromLocalStorage = () => (
  (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const userinfo = jwt.decode(token);
      dispatch(signinSuccess('Sign in successful.', userinfo));
    }
  }
);

