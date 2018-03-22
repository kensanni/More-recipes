import signOutUser, { SIGNOUT_USER, signOut } from '../../actions/signOutAction';
import mocklocalStorage from '../__mocks__/localStorage';

window.localStorage = mocklocalStorage;


describe('signOut Action', () => {
  it('initiate signout action to log user out', () => {
    const actionResult = signOut();
    expect(actionResult).toEqual({
      type: SIGNOUT_USER,
      userData: {},
      isAuthenticated: false
    });
  });
  it('dispatches signout action', () => {
    const localStorage = jest.fn();
    const actionResult = signOutUser();
    expect(actionResult).toEqual({
      type: SIGNOUT_USER,
      userData: {},
      isAuthenticated: false
    });
  });
});

