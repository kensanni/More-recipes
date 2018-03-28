import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../../../components/Include/carousel';

describe('Carousel component', () => {
  it('matches snapshot', () => {
    const output = shallow(<Carousel />);
    expect(output).toMatchSnapshot();
  });
});
