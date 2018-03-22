import React from 'react';
import { shallow } from 'enzyme';
import IndexHeader from '../../../../components/common/IndexHeader';

describe('IndexHeader component', () => {
  it('matches snapshot', () => {
    const output = shallow(<IndexHeader />);
    expect(output).toMatchSnapshot();
  });
});
