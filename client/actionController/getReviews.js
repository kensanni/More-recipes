import instance from '../Helpers/helper';
import { getReviewsRequest, getReviewsSuccess, getReviewsError, getNextReviewsSuccess } from '../actions/getReviewsAction';

/**
 * @description action creator for getting all reviews
 *
 * @param {number} recipeId
 * @param {page} page
 *
 * @return {void} action to be dispatch to the store
 */
export default function getReviews(recipeId, page) {
  return (dispatch) => {
    dispatch(getReviewsRequest(recipeId));
    return instance.get(`/reviews/${recipeId}?limit=10&page=${page}`)
      .then((reviews) => {
        const { getAllReviews, pages } = reviews.data;
        if (page > 0) {
          dispatch(getNextReviewsSuccess(getAllReviews, pages));
        } else {
          dispatch(getReviewsSuccess(getAllReviews, pages));
        }
      })
      .catch((errors) => {
        dispatch(getReviewsError(errors[0].message));
      });
  };
}
