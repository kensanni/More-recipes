import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../../components/recipePages/LandingPage';

describe('Landing page component', () => {
  it('matches snapshot', () => {
    const output = shallow(<LandingPage />);
    expect(output).toMatchSnapshot();
  });
});
