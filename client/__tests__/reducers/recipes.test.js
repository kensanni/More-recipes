import getAllRecipeSuccessful from '../../reducers/recipeReducer';
import * as types from '../../actions/getRecipeAction';
import * as addTypes from '../../actions/addRecipeAction';
import * as editTypes from '../../actions/editRecipeAction';
import * as upvoteTypes from '../../actions/upvoteRecipeAction'
import * as downvoteTypes from '../../actions/downvoteRecipeAction'


import mockData from '../__mocks__/recipeData.json';


const {
  addRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  recipeData: [],
  errorMessage: '',
  page: 0
};

describe('Get all recipes reducer', () => {
  it('should return the initial state', () => {
    const newState = getAllRecipeSuccessful(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_RECIPE_REQUEST', () => {
    const newState = getAllRecipeSuccessful(initialState, types.getRecipeRequest());
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      recipeData: [],
      errorMessage: ''
    });
  });
  it('should handle GET_RECIPE_SUCCESSFUL', () => {
    const page = 3;
    const count = 10;

    const newState = getAllRecipeSuccessful(initialState, types.getRecipeSuccess([addRecipe], page));
    expect(newState).toEqual({
      ...initialState,
      isFetched: true,
      recipeData: [addRecipe],
      errorMessage: '',
      page,
    });
  });
  it('should handle GET_RECIPE_ERROR', () => {
    const errorMessage = 'Login to continue';
    const newState = getAllRecipeSuccessful(initialState, types.getRecipeError(errorMessage));
    expect(newState).toEqual({
      ...initialState,
      isFetched: false,
      recipeData: [],
      errorMessage
    });
  });
  it('should handle INCREMENT_UPVOTE', () => {
    const recipeId = 0;    
    const newState = getAllRecipeSuccessful(initialState, upvoteTypes.incrementUpvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeData: []
    });
  });
  it('should handle DECREMENT_UPVOTE', () => {
    const recipeId = 0;    
    const newState = getAllRecipeSuccessful(initialState, upvoteTypes.decrementUpvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeData: []
    });
  });
  it('should handle INCREMENT_DOWNVOTE', () => {
    const recipeId = 0;    
    const newState = getAllRecipeSuccessful(initialState, downvoteTypes.incrementDownvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeData: []
    });
  });
  it('should handle DECREMENT_DOWNVOTE', () => {
    const recipeId = 0;    
    const newState = getAllRecipeSuccessful(initialState, downvoteTypes.incrementDownvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeData: []
    });
  });
});
