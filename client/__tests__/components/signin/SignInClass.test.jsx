import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../../components/signinPage/connectedComponent/SignIn';

describe('SignIn connected component', () => {
  it('matches snapshot', () => {
    const output = shallow(<SignIn />);
    expect(output).toMatchSnapshot();
  });

  describe('instance and lifecycle methods', () => {
    const props = {
      history: {
        push: jest.fn()
      },
      signInAction: jest.fn(),
      isAuthenticated: false
    };
    it('calls componentWillReceiveProps', () => {
      const newProps = {
        ...props,
        isAuthenticated: true,
      };
      const wrapper = shallow(<SignIn {...newProps} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ isAuthenticated: true, signinResponse: { errorMessage: 'error message' } });
      expect(cwrp).toHaveBeenCalled();
    });

    it('call component will unmount', () => {
      const wrapper = shallow(<SignIn {...props} />);
      const cwrp = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
      wrapper.unmount();
      expect(cwrp).toHaveBeenCalled();
    });

    it('handleChange', () => {
      const wrapper = shallow(<SignIn {...props} />);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().handleChange({ target: { name: 'username', value: '' } });
      expect(setState).toHaveBeenCalledWith({ username: '' });
    });

    it('handleSubmit', () => {
      const wrapper = shallow(<SignIn {...props} />);
      wrapper.instance().handleFormSubmit({ preventDefault: jest.fn() });
      expect(props.signInAction).toBeCalled();
    });
  });
});
