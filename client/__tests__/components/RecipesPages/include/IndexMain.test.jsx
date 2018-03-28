import React from 'react';
import { shallow } from 'enzyme';
import IndexMain from '../../../../components/Include/IndexMain';

describe('Index main component', () => {
  it('matches snapshot', () => {
    const output = shallow(<IndexMain />);
    expect(output).toMatchSnapshot();
  });
});
