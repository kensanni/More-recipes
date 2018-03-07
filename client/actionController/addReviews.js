import instance from '../Helpers/helper';
import { addReviewsRequest, addReviewsSuccessful, addReveiwsError } from '../actions/addReviewsAction';

/**
 * @description action creator for adding reveiws
 *
 * @param {number} recipeId
 *
 * @param {object} review
 *
 * @returns {void} redux action to be dispatch to the store
 */
export default function addReviews(recipeId, review) {
  console.log('@@@@@@@@@@@@@@@@@@', recipeId, review);
  return (dispatch) => {
    console.log('#################', recipeId, review);
    dispatch(addReviewsRequest(recipeId, review));
    instance.post(`/recipes/${recipeId}/reviews`, { review })
      .then((res) => {
        const { message, data } = res.data;
        dispatch(addReviewsSuccessful(message, data.review));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(addReveiwsError(errors[0].message));
      });
  };
}
