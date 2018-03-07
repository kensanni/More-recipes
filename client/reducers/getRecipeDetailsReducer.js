import { GET_RECIPE_DETAILS_REQUEST, GET_RECIPE_DETAILS_SUCCESSFUL, GET_RECIPE_DETAILS_ERROR } from '../actions/getRecipeDetailsAction';
import { INCREMENT_UPVOTE, DECREMENT_UPVOTE } from '../actions/upvoteRecipeAction';
import { INCREMENT_DOWNVOTE, DECREMENT_DOWNVOTE } from '../actions/downvoteRecipeAction';
import { FAVORITE_RECIPE_SUCCESSFUL } from '../actions/favoriteRecipeAction';
import { ADD_REVIEWS_SUCCESSFUL } from '../actions/addReviewsAction';

const initialState = {
  isFetched: false,
  recipeDetails: {},
  errorMessage: ''
};

const getRecipeDetailsReducer = (state = initialState, action) => {
  const { isFetched, recipeDetails, errorMessage, review } = action;
  const reviewied = {
    review
  };
  const newReview = [];
  console.log(review, 'rev');
  if (review) {
    state.recipeDetails.Reviews.map((reviews) => {
      newReview.push(reviews);
    });
    newReview.push(reviewied);
  }
  switch (action.type) {
    case GET_RECIPE_DETAILS_REQUEST:
      return {
        ...state,
        isFetched,
        recipeDetails: {},
        errorMessage: ''
      };
    case GET_RECIPE_DETAILS_SUCCESSFUL:
      return {
        ...state,
        isFetched,
        recipeDetails,
        errorMessage: ''
      };
    case GET_RECIPE_DETAILS_ERROR:
      return {
        ...state,
        isFetched,
        recipeDetails: {},
        errorMessage
      };
    case INCREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          upvotes: state.recipeDetails.upvotes + 1
        }
      };
    case DECREMENT_UPVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          upvotes: state.recipeDetails.upvotes - 1
        }
      };
    case INCREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          downvotes: state.recipeDetails.downvotes + 1
        }
      };
    case DECREMENT_DOWNVOTE:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          downvotes: state.recipeDetails.downvotes - 1
        }
      };
    case FAVORITE_RECIPE_SUCCESSFUL:
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails.favorites
        }
      };
    case ADD_REVIEWS_SUCCESSFUL:
      console.log('########??????????________', newReview);
      return {
        ...state,
        isFetched: state.isFetched,
        errorMessage: state.errorMessage,
        page: state.page,
        recipeDetails: {
          ...state.recipeDetails,
          Reviews: newReview
        }
      };
    default:
      return state;
  }
};

export default getRecipeDetailsReducer;
