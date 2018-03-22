import React from 'react';
import { shallow } from 'enzyme';
import RecipeNotFound from '../../../../components/Error/RecipeNotFound';

describe('IndexHeader component', () => {
  it('Recipe not found component', () => {
    const output = shallow(<RecipeNotFound />);
    expect(output).toMatchSnapshot();
  });
});
