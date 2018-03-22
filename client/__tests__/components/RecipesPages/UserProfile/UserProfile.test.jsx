import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from '../../../../components/recipePages/userProfile/UserProfile';

describe('user profile component', () => {
  it('matches snapshot', () => {
    const props = {
      userData: { email: '', username: '' }
    };
    const output = shallow(<UserProfile {...props} />);
    expect(output).toMatchSnapshot();
  });
});
