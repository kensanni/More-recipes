import getRecipeDetailsReducer from '../../reducers/getRecipeDetailsReducer';
import * as types from '../../actions/getRecipeDetailsAction';
import * as upvoteTypes from '../../actions/upvoteRecipeAction';
import * as downvoteTypes from '../../actions/downvoteRecipeAction';
import * as favoriteTypes from '../../actions/favoriteRecipeAction';
import mockData from '../__mocks__/recipeData.json';


const {
  validRecipe
} = mockData.Recipes;

const initialState = {
  isFetched: false,
  recipeDetails: {
    upvotes: 0,
    downvotes: 0,
    favorites: 0
  },
  recipeDetailStatus: null,
  errorMessage: ''
};

describe('Get recipe details reducer', () => {
  it('should return the initial state', () => {
    const newState = getRecipeDetailsReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle GET_RECIPE_DETAILS_REQUEST', () => {
    const newState = getRecipeDetailsReducer(initialState, types.getRecipeDetailsRequest());
    expect(newState).toEqual({
      isFetched: false,
      recipeDetails: {},
      recipeDetailStatus: 'fetching',
      errorMessage: ''
    });
  });
  it('should handle GET_RECIPE_DETAILS_SUCCESSFUL', () => {
    const newState =
      getRecipeDetailsReducer(
        initialState,
        types.getRecipeDetailsSuccessful(validRecipe)
      );
    expect(newState).toEqual({
      isFetched: true,
      recipeDetails: validRecipe,
      recipeDetailStatus: 'fetched',
      errorMessage: ''
    });
  });
  it('should handle GET_RECIPE_DETAILS_ERROR', () => {
    const errorMessage = 'Recipe not found ';
    const newState =
      getRecipeDetailsReducer(
        initialState,
        types.getRecipeDetailsError(errorMessage)
      );
    expect(newState).toEqual({
      isFetched: false,
      recipeDetails: {},
      recipeDetailStatus: 'error',
      errorMessage
    });
  });
  it('should handle INCREMENT_UPVOTE', () => {
    const recipeId = 0;
    const newState = getRecipeDetailsReducer(initialState, upvoteTypes.incrementUpvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeDetails: {
        ...initialState.recipeDetails,
        upvotes: initialState.recipeDetails.upvotes + 1
      }
    });
  });
  it('should handle DECREMENT_UPVOTE', () => {
    const recipeId = 0;
    const newState = getRecipeDetailsReducer(initialState, upvoteTypes.decrementUpvote(recipeId));
    expect(newState).toEqual({
      ...initialState,
      recipeDetails: {
        ...initialState.recipeDetails,
        upvotes: initialState.recipeDetails.upvotes - 1
      }
    });
  });
  it('should handle INCREMENT_DOWNVOTE', () => {
    const recipeId = 0;
    const newState =
      getRecipeDetailsReducer(
        initialState,
        downvoteTypes.incrementDownvote(recipeId)
      );
    expect(newState).toEqual({
      ...initialState,
      recipeDetails: {
        ...initialState.recipeDetails,
        downvotes: initialState.recipeDetails.downvotes + 1
      }
    });
  });
  it('should handle DECREMENT_DOWNVOTE', () => {
    const recipeId = 0;
    const newState =
      getRecipeDetailsReducer(
        initialState,
        downvoteTypes.decrementDownvote(recipeId)
      );
    expect(newState).toEqual({
      ...initialState,
      recipeDetails: {
        ...initialState.recipeDetails,
        downvotes: initialState.recipeDetails.downvotes - 1
      }
    });
  });
  it('should handle FAVORITE_RECIPE_SUCCESSFUL', () => {
    const responseMessage = 'Recipe successfully favorited';
    const recipeId = 1;
    const favoriteType = 1;
    const newState =
      getRecipeDetailsReducer(
        initialState,
        favoriteTypes.favoriteRecipeSuccess(recipeId, responseMessage, favoriteType)
      );
    expect(newState).toEqual({
      ...initialState,
      recipeDetails: {
        ...initialState.recipeDetails,
        favorites: (
          favoriteType === 1
            ? initialState.recipeDetails.favorites + 1
            : initialState.recipeDetails.favorites - 1
        )
      }
    });
  });
});
