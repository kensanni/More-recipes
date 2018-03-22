import instance from '../Helpers/helper';
import { addReviewsRequest, addReveiwsError } from '../actions/addReviewsAction';
import { addReviewsSuccessful } from '../actions/getReviewsAction';

/**
 * @description action creator for adding reveiws
 *
 * @param {number} recipeId
 * @param {object} review
 *
 * @returns {void} action to be dispatch to the store
 */
export default function addReviews(recipeId, review) {
  return (dispatch) => {
    dispatch(addReviewsRequest(recipeId, review));
    return instance.post(`/recipes/${recipeId}/reviews`, { review })
      .then((res) => {
        const { data } = res.data;
        dispatch(addReviewsSuccessful(data.review, data.username, data.createdAt));
      })
      .catch((error) => {
        const { errors } = error.response.data;
        dispatch(addReveiwsError(errors[0].message));
      });
  };
}
