import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../../components/common/Footer';

Enzyme.configure({
  adapter: new Adapter()
});


describe('Footer component', () => {
  it('matches snapshot', () => {
    const output = shallow(<Footer />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
