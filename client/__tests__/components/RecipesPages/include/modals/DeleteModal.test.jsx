import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../../../../components/Include/modals/DeleteModal';

describe('Delete modal component', () => {
  it('matches snapshot', () => {
    const props = {
      value: {}
    };
    const output = shallow(<DeleteModal {...props} />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      value: {},
      deleteRecipe: jest.fn()
    };
    const output = shallow(<DeleteModal {...props} />);
    const button = output.find('button[className="btn btn-danger"]');
    button.simulate('click');
    expect(props.deleteRecipe).toHaveBeenCalled();
  });
});
