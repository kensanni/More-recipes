import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/signinPage/Form';

describe('SignIn Form component', () => {
  it('matches snapshot', () => {
    const props = {
      value: {}
    }
    const output = shallow(<Form {...props} />);
    expect(output).toMatchSnapshot();
  })
})