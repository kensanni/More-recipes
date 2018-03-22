import React from 'react';
import { shallow } from 'enzyme';
import RecipeGrid from '../../../components/recipePages/RecipeGrid';

describe('Recipe grid component', () => {
  it('matches snapshot', () => {
    const props = {
      recipes: []
    };
    const output = shallow(<RecipeGrid {...props} />);
    expect(output).toMatchSnapshot();
  });
});
