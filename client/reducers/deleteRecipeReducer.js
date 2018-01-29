import { DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESSFUL, DELETE_RECIPE_ERROR } from '../actions/deleteRecipeAction';

const initialState = [{
  isDeleted: false,
  deletedRecipe: {},
  errorMessage: '',
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
      },
      ...state,
      ];
    case DELETE_RECIPE_SUCCESSFUL:
      return [{
        isDeleted: action.isDeleted,
        deletedRecipe: {},
        responseMessage: action.responseMessage,
        errorMessage: '',
      },
      ...state,
      ];
    case DELETE_RECIPE_ERROR:
      return [{
        isDeleted: action.isDeleted,
        deletedRecipe: {},
        errorMessage: action.errorMessage,
        responseMessage: '',
      },
      ...state,
      ];
    default:
      return state;
  }
};

export default deleteRecipeReducer;
