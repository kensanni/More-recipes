import React from 'react';
import { shallow } from 'enzyme';
import { UserProfileContainer } from '../../../../components/recipePages/userProfile/UserProfileContainer';

describe('user profile container component', () => {
  it('matches snapshot', () => {
    const props = {
      favoriteRecipes: {
        recipeData: []
      },
      history: {
        push: jest.fn()
      }
    };
    const output = shallow(<UserProfileContainer {...props} />);
    expect(output).toMatchSnapshot();
  });
});
