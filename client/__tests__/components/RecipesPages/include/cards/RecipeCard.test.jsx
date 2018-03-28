import React from 'react';
import { shallow } from 'enzyme';
import RecipeCard from '../../../../../components/Include/cards/RecipeCard';

describe('Recipe card component', () => {
  it('matches snapshot', () => {
    const props = {
      recipe: {}
    };
    const output = shallow(<RecipeCard {...props} />);
    expect(output).toMatchSnapshot();
  });
});
