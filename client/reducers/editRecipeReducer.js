import { EDIT_RECIPE_REQUEST, EDIT_RECIPE_SUCCESSFUL, EDIT_RECIPE_ERROR } from '../actions/editRecipeAction';

const initialState = [{
  isEdited: false,
  recipeData: {},
  responseMessage: '',
  errorMessage: ''
}];

const editRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_RECIPE_REQUEST:
      return [{
        isEdited: action.isEdited,
        recipeData: {},
        responseMessage: '',
        errorMessage: ''
      },
      ...state
      ];
    case EDIT_RECIPE_SUCCESSFUL:
      return [{
        isEdited: action.isEdited,
        responseMessage: action.responseMessage,
        recipeData: {},
        errorMessage: ''
      },
      ...state
      ];
    case EDIT_RECIPE_ERROR:
      return [{
        isEdited: action.isEdited,
        responseMessage: '',
        recipeData: {},
        errorMessage: action.errorMessage
      },
      ...state
      ];
    default:
      return state;
  }
};

export default editRecipeReducer;
