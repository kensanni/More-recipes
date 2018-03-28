// Action Types
export const SIGNOUT_USER = 'SIGNOUT_USER';

export const signOut = () => ({
  type: SIGNOUT_USER,
  userData: {},
  isAuthenticated: false
});

/**
 * @description log user out of the application
 *
 * @returns {void} dispatch action types
 */
export default function signOutUser() {
  localStorage.removeItem('token');
  return {
    type: SIGNOUT_USER,
    userData: {},
    isAuthenticated: false
  };
}
