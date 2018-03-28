import clearImageAction, { CLEAR_IMAGE } from '../../actions/clearImageAction';

describe('clear image Action', () => {
  it('Initiate clear image Action', () => {
    const actionResult = clearImageAction();
    expect(actionResult).toEqual({
      type: CLEAR_IMAGE,
    });
  });
});
