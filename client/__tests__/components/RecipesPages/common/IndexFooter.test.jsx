import React from 'react';
import { shallow } from 'enzyme';
import IndexFooter from '../../../../components/common/IndexFooter';

describe('IndexFooter component', () => {
  it('matches snapshot', () => {
    const output = shallow(<IndexFooter />);
    expect(output).toMatchSnapshot();
  });
});
