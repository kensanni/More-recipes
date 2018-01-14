import axios from 'axios';
import Helper from '../Helpers/helper';
import { signupError, signupRequest, signupSuccess } from '../actions/signupAction';

const URL = '/api/v1';


/**
   * @description register user's action
   * @param {object} userdata user registration details
   * @return {object} Redux action to be dispatched to the store
   */
export default function signup(userdata) {
  return (dispatch) => {
    dispatch(signupRequest(userdata));
    axios.post(`${URL}/users/signup`, userdata)
      .then((res) => {
        const { token, message } = res.data;
        localStorage.setItem('token', token);
        Helper.setAuthorizationToken(token);
        dispatch(signupSuccess(message));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(signupError(errors[0].message));
      });
  };
}
