import React from 'react';
import { shallow } from 'enzyme';
import GuestHeader from '../../../../components/common/GuestHeader';

describe('Guest Header component', () => {
  it('matches snapshot', () => {
    const output = shallow(<GuestHeader />);
    expect(output).toMatchSnapshot();
  });
});
