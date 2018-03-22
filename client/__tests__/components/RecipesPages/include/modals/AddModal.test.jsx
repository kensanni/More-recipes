import React from 'react';
import { shallow } from 'enzyme';
import AddModal from '../../../../../components/Include/modals/AddModal';

describe('Add modal component', () => {
  it('matches snapshot', () => {
    const props = {
      value: {}
    };
    const output = shallow(<AddModal {...props} />);
    expect(output).toMatchSnapshot();
  });
});
