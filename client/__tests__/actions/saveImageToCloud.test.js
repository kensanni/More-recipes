import * as actions from '../../actions/saveImageToCloud';

describe('Save image to cloud Action', () => {
  describe('Initiate save image to cloud action request', () => {
    it('should create an action to initiate a request', () => {
      const image = '';
      const actionResults = actions.saveImageToCloudRequest(image);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_REQUEST,
        image,
        isUploaded: false
      });
    });
  });
  describe('Receive save image to cloud action response', () => {
    it('should create an action to receive a successful response', () => {
      const image = '';
      const actionResults = actions.saveImageToCloudSuccessful(image);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_SUCCESSFUL,
        image,
        isUploaded: true
      });
    });
  });
  describe('Receive save image to cloud action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.saveImageToCloudError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.SAVE_IMAGE_TO_CLOUD_ERROR,
        errorMessage,
        isUploaded: false
      });
    });
  });
});
