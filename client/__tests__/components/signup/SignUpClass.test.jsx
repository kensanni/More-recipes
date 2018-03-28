import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../../components/signupPage/connectedComponent/SignUp';

describe('Signup connected component', () => {
  it('matches snapshot', () => {
    const output = shallow(<SignUp />);
    expect(output).toMatchSnapshot();
  });
  describe('instance and lifecycle methods', () => {
    const props = {
      history: {
        push: jest.fn()
      },
      signUpAction: jest.fn(),
      isAuthenticated: false,
      signupResponse: {}
    };
    it('calls componentWillRecieveProps', () => {
      const wrapper = shallow(<SignUp {...props} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ isAuthenticated: true, signupResponse: { errorMessage: 'error message' } });
      expect(cwrp).toHaveBeenCalled();
    });
    it('call component will unmount', () => {
      const wrapper = shallow(<SignUp {...props} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
      wrapper.unmount();
      expect(cwrp).toHaveBeenCalled();
    });
    it('handleChanges', () => {
      const wrapper = shallow(<SignUp {...props} />);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().handleChange({ target: { name: 'username', value: '' } });
      expect(setState).toHaveBeenCalledWith({ username: '' });
    });
    it('handleSubmit for else condition', () => {
      const wrapper = shallow(<SignUp {...props} />);
      wrapper.setState({ password: 'all', confirmPassword: 'password' });
      wrapper.instance().handleFormSubmit({ preventDefault: jest.fn() });
      expect(props.signUpAction).not.toBeCalled();
    });
    it('handleSubmit', () => {
      const wrapper = shallow(<SignUp {...props} />);
      wrapper.instance().handleFormSubmit({ preventDefault: jest.fn() });
      expect(props.signUpAction).toBeCalled();
    });
  });
});
