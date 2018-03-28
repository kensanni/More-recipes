import React from 'react';
import { shallow } from 'enzyme';
import FavoriteButton from '../../../../../components/Include/buttons/FavoriteButton';

describe('Favorite button component', () => {
  it('matches snapshot', () => {
    const output = shallow(<FavoriteButton />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      favoriteRecipe: jest.fn()
    };
    const output = shallow(<FavoriteButton {...props} />);
    const button = output.find('i[aria-hidden="true"]');
    button.simulate('click');
    expect(props.favoriteRecipe).toHaveBeenCalled();
  });
});
