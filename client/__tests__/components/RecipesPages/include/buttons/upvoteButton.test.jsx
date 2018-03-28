import React from 'react';
import { shallow } from 'enzyme';
import UpVoteButton from '../../../../../components/Include/buttons/UpVoteButton';

describe('Upvote button', () => {
  it('matches snapshot', () => {
    const output = shallow(<UpVoteButton />);
    expect(output).toMatchSnapshot();
  });
  it('calls onClick', () => {
    const props = {
      upvoteRecipe: jest.fn()
    };
    const output = shallow(<UpVoteButton {...props} />);
    const button = output.find('i[aria-hidden="true"]');
    button.simulate('click');
    expect(props.upvoteRecipe).toHaveBeenCalled();
  });
});
