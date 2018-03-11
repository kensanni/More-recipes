export const SIGNOUT_USER = 'SIGNOUT_USER';

/**
 * @description log user out of the application
 *
 * @returns {void} dispatch action types
 */
export default function signOutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
      type: SIGNOUT_USER,
      userdata: {},
      isAuthenticated: false
    });
  };
}
