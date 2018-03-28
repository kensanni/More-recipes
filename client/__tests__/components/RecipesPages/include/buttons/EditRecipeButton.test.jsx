import React from 'react';
import { shallow } from 'enzyme';
import EditRecipeButton from '../../../../../components/Include/buttons/EditRecipeButton';

describe('Edit recipe button component', () => {
  it('matches snapshot', () => {
    const output = shallow(<EditRecipeButton />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      value: {},
      onEditClicked: jest.fn()
    };
    const output = shallow(<EditRecipeButton {...props} />);
    const button = output.find('button[type="button"]');
    button.simulate('click');
    expect(props.onEditClicked).toHaveBeenCalled();
  });
});
