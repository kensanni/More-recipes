import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../components/signinPage/Form';

describe('SignIn Form component', () => {
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
    const usernameInputField = output.find('input[name="username"]');
    usernameInputField.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
});
