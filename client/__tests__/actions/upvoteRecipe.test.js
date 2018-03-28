import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import mockData from '../__mocks__/recipeData.json';
import upvoteRecipeAction from '../../actionController/upvoteRecipe';
import * as actions from '../../actions/upvoteRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Upvote recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.upvoteRecipeRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_REQUEST,
        recipeId,
        isUpvoted: false
      });
    });
  });
  describe('Receive upvote recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = '';
      const actionResults = actions.upvoteRecipeSuccess(responseMessage);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_SUCCESSFUL,
        responseMessage,
        isUpvoted: true
      });
    });
  });
  describe('Receive upvote action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.upvoteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.UPVOTE_RECIPE_ERROR,
        errorMessage,
        isUpvoted: false
      });
    });
    describe('Receive upvote action to increment recipe', () => {
      it('should create an action to increment upvote', () => {
        const recipeId = null;
        const actionResults = actions.incrementUpvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.INCREMENT_UPVOTE,
          recipeId,
        });
      });
    });
    describe('Receive upvote action error to decrement recipe', () => {
      it('should create an action to decrement upvote', () => {
        const recipeId = null;
        const actionResults = actions.decrementUpvote(recipeId);
        expect(actionResults).toEqual({
          type: actions.DECREMENT_UPVOTE,
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

  describe('Upvote recipe', () => {
    const recipeId = 9;
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Recipe successfully upvoted',
            data: upvote,
            downvoteStatus: 'notDownvoted'
          }
        });
      });

      const expectedActions = [
        actions.upvoteRecipeRequest(recipeId),
        actions.incrementUpvote(recipeId),
        actions.upvoteRecipeSuccess('Recipe successfully upvoted')
      ];

      await store.dispatch(upvoteRecipeAction(recipeId));
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
      actions.upvoteRecipeRequest(),
      actions.upvoteRecipeError('Login to continue')
    ];

    await store.dispatch(upvoteRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
