import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/signupPage/Form';

describe('Form', () => {
  it('matches snapshot', () => {
    const props = {
      value: {}
    }
    const output = shallow(<Form {...props} />);
    expect(output).toMatchSnapshot();
  });
});