import React from 'react';
import { shallow } from 'enzyme';
import FavoriteRecipeTitle from '../../../../components/Include/FavoriteRecipeTitle';

describe('Favorite recipe title', () => {
  it('matches snapshot', () => {
    const output = shallow(<FavoriteRecipeTitle />);
    expect(output).toMatchSnapshot();
  });
});
