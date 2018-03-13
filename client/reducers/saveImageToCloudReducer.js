import { SAVE_IMAGE_TO_CLOUD_REQUEST, SAVE_IMAGE_TO_CLOUD_SUCCESSFUL, SAVE_IMAGE_TO_CLOUD_ERROR } from '../actions/saveImageToCloud';

const initialState = {
  image: '',
  isUploaded: false,
  errorMessage: ''
};

/**
 * @description save image to cloudinary reducer
 *
 * @param {object} state - default application state
 *
 * @param {object} action - action dispatched
 *
 * @return {Object} - Object containg new state
 */
const saveImageToCloudReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_IMAGE_TO_CLOUD_REQUEST:
      return {
        ...state,
        image: '',
        isUploaded: action.isUploaded
      };
    case SAVE_IMAGE_TO_CLOUD_SUCCESSFUL:
      return {
        ...state,
        image: action.image,
        isUploaded: action.isUploaded
      };
    case SAVE_IMAGE_TO_CLOUD_ERROR:
      return {
        ...state,
        image: '',
        isUploaded: action.isUploaded,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export default saveImageToCloudReducer;
