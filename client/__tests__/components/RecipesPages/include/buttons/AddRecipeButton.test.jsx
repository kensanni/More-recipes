import React from 'react';
import { shallow } from 'enzyme';
import AddRecipeButton from '../../../../../components/Include/buttons/AddRecipeButton';

describe('Add recipe button component', () => {
  it('matches snapshot', () => {
    const output = shallow(<AddRecipeButton />);
    expect(output).toMatchSnapshot();
  });
});
