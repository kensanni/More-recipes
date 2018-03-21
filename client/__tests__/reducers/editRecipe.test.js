import editRecipeReducer from '../../reducers/editRecipeReducer';
import * as types from '../../actions/editRecipeAction';

import localStorage from 'mock-local-storage';

global.window = {};
window.localStorage = global.localStorage;

const initialState = {
  isEdited: false,
  recipeData: {},
  editRecipeStatus: {
    status: null,
    message: null
  },
  responseMessage: '',
  errorMessage: ''
};

describe('Edit recipe reducer', () => {
  it('should return the initial state', () => {
    const newState = editRecipeReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });
  it('should handle EDIT_RECIPE_STATUS', () => {
    const status = 'Edited';
    const message = 'edited';
    const newState = editRecipeReducer(initialState, types.editRecipeStatus(status, message));
    expect(newState).toEqual({
      ...initialState,
      editRecipeStatus: {
        status,
        message,
      }
    });
  });
});
