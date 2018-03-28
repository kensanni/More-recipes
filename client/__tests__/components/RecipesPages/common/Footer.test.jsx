import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../components/common/Footer';

describe('Footer component', () => {
  it('matches snapshot', () => {
    const output = shallow(<Footer />);
    expect(output).toMatchSnapshot();
  });
});
