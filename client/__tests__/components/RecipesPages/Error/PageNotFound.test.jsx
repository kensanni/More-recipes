import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../../../components/Error/PageNotFound';

describe('Page not found component', () => {
  it('matches snapshot', () => {
    const output = shallow(<PageNotFound />);
    expect(output).toMatchSnapshot();
  });
});
