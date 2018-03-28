import saveImageReducer from '../../reducers/saveImageToCloudReducer';
import * as types from '../../actions/saveImageToCloud';
import clearImageAction from '../../actions/clearImageAction';

const initialState = {
  image: '',
  isUploaded: false,
  errorMessage: ''
};

describe('Save Image to cloudinary reducer', () => {
  it('should return the initial state', () => {
    const newState = saveImageReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle SAVE_IMAGE_TO_CLOUD_REQUEST', () => {
    const image = '';
    const newState = saveImageReducer(initialState, types.saveImageToCloudRequest(image));
    expect(newState).toEqual({
      ...initialState,
      image,
      isUploaded: false
    });
  });
  it('should handle SAVE_IMAGE_TO_CLOUD_SUCCESSFUL', () => {
    const image = 'img';
    const newState = saveImageReducer(initialState, types.saveImageToCloudSuccessful(image));
    expect(newState).toEqual({
      ...initialState,
      image,
      isUploaded: true
    });
  });
  it('should handle SAVE_IMAGE_TO_CLOUD_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState = saveImageReducer(initialState, types.saveImageToCloudError(errorMessage));
    expect(newState).toEqual({
      ...initialState,
      errorMessage
    });
  });
  it('should handle CLEAR_IMAGE', () => {
    const newState = saveImageReducer(initialState, clearImageAction());
    expect(newState).toEqual({
      ...initialState,
    });
  });
});
