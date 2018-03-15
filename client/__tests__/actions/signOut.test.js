import { SIGNOUT_USER, signOut } from '../../actions/signOutAction';

describe('signOut Action', () => {
  it('initiate signout action to log user out', () => {
    const actionResult = signOut();
    expect(actionResult).toEqual({
      type: SIGNOUT_USER,
      userData: {},
      isAuthenticated: false
    });
  });
});

