import { ADD_REVIEWS_REQUEST, ADD_REVIEWS_SUCCESSFUL, ADD_REVIEWS_ERROR } from '../actions/addReviewsAction';

const initialState = {
  isAdded: false,
  responseMesage: '',
  review: '',
  errorMessage: ''
};

const addReviewsReducer = (state = initialState, action) => {
  const {
    isAdded, responseMessage, review, errorMessage,
  } = action;
  switch (action.type) {
    case ADD_REVIEWS_REQUEST:
      return {
        ...state,
        isAdded,
        responseMessage: '',
        review,
        errorMessage: ''
      };
    case ADD_REVIEWS_SUCCESSFUL:
      return {
        ...state,
        isAdded,
        responseMessage,
        review,
        errorMessage: ''
      };
    case ADD_REVIEWS_ERROR:
      return {
        ...state,
        isAdded,
        errorMessage,
        review: '',
      };
    default:
      return state;
  }
};

export default addReviewsReducer;
