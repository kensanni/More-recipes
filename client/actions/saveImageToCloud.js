export const SAVE_IMAGE_TO_CLOUD_REQUEST = 'SAVE_IMAGE_TO_CLOUD_REQUEST';
export const SAVE_IMAGE_TO_CLOUD_SUCCESSFUL = 'SAVE_IMAGE_TO_CLOUD_SUCCESSFUL';
export const SAVE_IMAGE_TO_CLOUD_ERROR = 'SAVE_IMAGE_TO_CLOUD_ERROR';

export const saveImageToCloudRequest = image => ({
  type: 'SAVE_IMAGE_TO_CLOUD_REQUEST',
  image,
  isUploaded: false
});
export const saveImageToCloudSuccessful = image => ({
  type: 'SAVE_IMAGE_TO_CLOUD_SUCCESSFUL',
  image,
  isUploaded: true
});
export const saveImageToCloudError = errorMessage => ({
  type: 'SAVE_IMAGE_TO_CLOUD_ERROR',
  errorMessage,
  isUploaded: false
});
