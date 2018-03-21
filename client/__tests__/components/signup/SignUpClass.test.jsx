import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../../components/signupPage/connectedComponent/SignUp';

describe('Signup connected component', () => {
  it('matches snapshot', () => {
    const output = shallow(<SignUp />);
    expect(output).toMatchSnapshot();    
  });
})