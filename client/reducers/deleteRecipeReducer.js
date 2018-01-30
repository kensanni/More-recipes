import { DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESSFUL, DELETE_RECIPE_ERROR } from '../actions/deleteRecipeAction';

const initialState = [{
  isDeleted: false,
  errorMessage: '',
  recipeId: null,
  responseMessage: ''
}];

const deleteRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
      return [{
        isDeleted: action.isDeleted,
        deletedRecipe: action.deletedRecipe,
        errorMessage: '',
        responseMessage: '',
        recipeId: null,
      },
      ...state,
      ];
    case DELETE_RECIPE_SUCCESSFUL:
      return [{
        isDeleted: action.isDeleted,
        responseMessage: action.responseMessage,
        recipeId: null,
        errorMessage: '',
      },
      ...state,
      ];
    case DELETE_RECIPE_ERROR:
      return [{
        isDeleted: action.isDeleted,
        errorMessage: action.errorMessage,
        responseMessage: '',
        recipeId: null,
      },
      ...state,
      ];
    default:
      return state;
  }
};

export default deleteRecipeReducer;
