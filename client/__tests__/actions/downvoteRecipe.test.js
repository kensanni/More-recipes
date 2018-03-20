import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import mockData from '../mockData/recipeData.json';
import downvoteRecipeAction from '../../actionController/downvoteRecipe';
import * as actions from '../../actions/downvoteRecipeAction';
import * as votes from '../../actions/upvoteRecipeAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Downvote recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipe = null;
      const actionResults = actions.downvoteRecipeRequest(recipe);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_REQUEST,
        recipe,
        isDownvoted: false
      });
    });
  });
  describe('Receive downvote recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const actionResults = actions.downvoteRecipeSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_SUCCESSFUL,
        responseMessage,
        isDownvoted: true
      });
    });
  });
  describe('Receive downvote action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.downvoteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.DOWNVOTE_RECIPE_ERROR,
        errorMessage,
        isDownvoted: false
      });
    });
    describe('Receive downvote action to increment recipe', () => {
      it('should create an action to increment downvote', () => {
        const recipeId = null;
        const actionResults = actions.incrementDownvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.INCREMENT_DOWNVOTE,
          recipeId,
        });
      });
    });
    describe('Receive downvote action error to decrement recipe', () => {
      it('should create an action to decrement downvote', () => {
        const recipeId = null;
        const actionResults = actions.decrementDownvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.DECREMENT_DOWNVOTE,
          recipeId,
        });
      });
    });
  });
});

describe('Async action', () => {
  let store;

  beforeEach(() => {
    moxios.install(instance);
    store = mockStore();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const {
    upvote
  } = mockData.Recipes;
  

  describe('Downvote recipe', () => {
    const recipeId = 9;
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Recipe successfully downvoted',
            data: upvote,
            upvoteStatus: 'upvoted'
          }
        });
      });

      const expectedActions = [
        actions.downvoteRecipeRequest(recipeId),
        votes.decrementUpvote(recipeId),
        actions.incrementDownvote(recipeId),
        actions.downvoteRecipeSuccess('Recipe successfully downvoted')
      ];

      await store.dispatch(downvoteRecipeAction(recipeId));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches error for a failed request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            errors: [
              {
                message: 'Login to continue'
              }
            ]
          }
        }
      });
    });

    const expectedActions = [
      actions.downvoteRecipeRequest(),
      actions.downvoteRecipeError('Login to continue')
    ];

    await store.dispatch(downvoteRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
