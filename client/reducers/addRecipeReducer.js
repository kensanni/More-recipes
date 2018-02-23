import { ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESSFUL, ADD_RECIPE_ERROR } from '../actions/addRecipeAction';

const initialState = [{
  isAdded: false,
  recipeData: {},
  responseMessage: '',
  errorMessage: ''
}];


const addRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return [{
        isAdded: action.isAdded,
        recipeData: {},
        responseMessage: '',
        errorMessage: ''
      },
      ...state
      ];
    case ADD_RECIPE_SUCCESSFUL:
      return [{
        isAdded: action.isAdded,
        recipeData: {},
        responseMessage: action.responseMessage,
        errorMessage: ''
      },
      ...state
      ];
    case ADD_RECIPE_ERROR:
      return [{
        isAdded: action.isAdded,
        recipeData: {},
        responseMessage: '',
        errorMessage: action.errorMessage,
      },
      ...state
      ];
    default:
      return state;
  }
};

export default addRecipeReducer;
