import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../../components/common/Header';

describe('Header component', () => {
  it('matches snapshot', () => {
    const output = shallow(<Header />);
    expect(output).toMatchSnapshot();
  });
  describe('instances and component life cycle', () => {
    const props = {
      value: {
        id: 3
      },
      signOutAction: jest.fn(),
      push: jest.fn()
    };
    const context = { context: { router: { history: { push: jest.fn() } } } };
    it('handleChange', () => {
      const wrapper = shallow(<Header {...props} />);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().onSearchChange({ value: '' });
      expect(setState).toHaveBeenCalledWith({ value: { value: '' } });
    });
    it('handles goToRecipe page', () => {
      const wrapper = shallow(<Header {...props} />, context);
      const setState = jest.spyOn(wrapper.instance(), 'gotoRecipe');
      wrapper.instance().gotoRecipe(props.value);
      expect(setState).toBeCalled();
    });
    it('handles signOut', () => {
      const wrapper = shallow(<Header {...props} />, context);
      wrapper.instance().signOut();
      expect(props.signOutAction).toBeCalled();
    });
    it('handles search state', () => {
      const wrapper = shallow(<Header {...props} />, context);
      const setState = jest.spyOn(wrapper.instance(), 'setState');
      wrapper.instance().toggleBackspaceRemoves();
      expect(setState).toBeCalled();
    });
  });
});

