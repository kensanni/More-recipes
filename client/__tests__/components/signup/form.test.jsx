import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/signupPage/Form';

describe('Form', () => {
  it('matches snapshot', () => {
    const props = {
      value: {}
    };
    const output = shallow(<Form {...props} />);
    expect(output).toMatchSnapshot();
  });
  it('calls onChange props', () => {
    const props = {
      value: {},
      onChange: jest.fn()
    };
    const output = shallow(<Form {...props} />);
    const passwordInputField = output.find('input[name="password"]');
    passwordInputField.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
});
