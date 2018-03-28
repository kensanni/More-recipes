import React from 'react';
import { shallow } from 'enzyme';
import DeleteRecipeButton from '../../../../../components/Include/buttons/DeleteRecipeButton';

describe('Delete recipe button component', () => {
  it('matches snapshot', () => {
    const output = shallow(<DeleteRecipeButton />);
    expect(output).toMatchSnapshot();
  });
});
