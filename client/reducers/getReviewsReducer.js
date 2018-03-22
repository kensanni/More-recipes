import { GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESSFUL, GET_REVIEWS_ERROR, GET_NEXT_REVIEWS_SUCCESSFUL, ADD_REVIEWS_SUCCESSFUL } from '../actions/getReviewsAction';

const initialState = {
  isFetched: false,
  reviews: [],
  errorMessage: '',
  pages: 0
};
/**
 * @description get all recipes reducer
 *
 * @param {object} state - default application state
 * @param {object} action - response from the api
 *
 * @return {Object} - Object containg new state
 */
const getReviewsReducer = (state = initialState, action) => {
  const {
    isFetched, reviews, errorMessage, pages, review, username, createdAt
  } = action;
  const reviewObj = { review, username, createdAt };
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        isFetched,
        errorMessage: ''
      };
    case GET_REVIEWS_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        reviews,
        errorMessage: '',
        pages,
      };
    case GET_NEXT_REVIEWS_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        reviews: state.reviews.concat(action.reviews),
        pages
      };
    case GET_REVIEWS_ERROR:
      return {
        ...state,
        isFetched,
        reviews: [],
        errorMessage
      };
    case ADD_REVIEWS_SUCCESSFUL:
      return {
        ...state,
        reviews: state.reviews.concat(reviewObj),
        errorMessage: ''
      };
    default:
      return state;
  }
};

export default getReviewsReducer;
