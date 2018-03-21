import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../../components/signinPage/connectedComponent/SignIn'

describe('SignIn connected component', () => {
  it('matches snapshot', () => {
    const output = shallow(<SignIn />)
    expect(output).toMatchSnapshot();
  })
})