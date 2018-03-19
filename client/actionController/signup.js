import jwt from 'jsonwebtoken';
import instance from '../Helpers/helper';
import { signupError, signupRequest, signupSuccess } from '../actions/signupAction';


/**
   * @description action controller to register a new user
   *
   * @param {object} userdata user registration details
   *
   * @returns {void} action to be dispatched to the store
   */
export default function signup(userdata) {
  return (dispatch) => {
    dispatch(signupRequest(userdata));
    instance.post('/users/signup', userdata)
      .then((res) => {
        const { token, message } = res.data;
        const userData = jwt.decode(token);
        localStorage.setItem('token', token);
        dispatch(signupSuccess(message, userData));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(signupError(errors[0].message));
      });
  };
}
