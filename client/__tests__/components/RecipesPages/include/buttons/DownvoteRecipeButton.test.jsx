import React from 'react';
import { shallow } from 'enzyme';
import DownVoteButton from '../../../../../components/Include/buttons/DownVoteButton';

describe('Downvote recipe button component', () => {
  it('matches snapshot', () => {
    const output = shallow(<DownVoteButton />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      downvoteRecipe: jest.fn()
    };
    const output = shallow(<DownVoteButton {...props} />);
    const button = output.find('i[aria-hidden="true"]');
    button.simulate('click');
    expect(props.downvoteRecipe).toHaveBeenCalled();
  });
});
