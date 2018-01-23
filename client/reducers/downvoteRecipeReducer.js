import { DOWNVOTE_RECIPE_REQUEST, DOWNVOTE_RECIPE_SUCCESSFUL, DOWNVOTE_RECIPE_ERROR } from '../actions/downVoteRecipeAction';

const initialState = [{
  isUpvoted: false,
  recipeId: null,
  responseMessage: '',
  errorMessage: ''
}];

const downvoteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNVOTE_RECIPE_REQUEST:
      return [{
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: '',
        errorMessage: '',
      },
      ...state
      ];
    case DOWNVOTE_RECIPE_SUCCESSFUL:
      return [{
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: action.responseMessage,
        errorMessage: '',
      },
      ...state
      ];
    case DOWNVOTE_RECIPE_ERROR:
      return [{
        recipeId: action.recipeId,
        isDownvoted: action.isDownvoted,
        responseMessage: '',
        errorMessage: action.errorMessage,
      },
      ...state
      ];
    default:
      return state;
  }
};

export default downvoteRecipeReducer;
