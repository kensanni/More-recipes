import React from 'react';
import { shallow } from 'enzyme';
import RecipeCardFooter from '../../../../../components/Include/cards/RecipeCardFooter';

describe('Recipe card footer component', () => {
  it('matches snapshot', () => {
    const props = {
      recipe: {}
    };
    const output = shallow(<RecipeCardFooter {...props} />);
    expect(output).toMatchSnapshot();
  });
});
