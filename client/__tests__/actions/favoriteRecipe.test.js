import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import mockData from '../__mocks__/recipeData.json';
import favoriteRecipeAction from '../../actionController/favoriteRecipe';
import * as actions from '../../actions/favoriteRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Favorite recipes Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.favoriteRecipeRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_REQUEST,
        recipeId,
        isFavorited: false
      });
    });
  });
  describe('Receive favorite recipes action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeId = null;
      const responseMessage = '';
      const favoriteType = null;

      const actionResults = actions.favoriteRecipeSuccess(recipeId, responseMessage, favoriteType);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_SUCCESSFUL,
        recipeId,
        favoriteType,
        responseMessage,
        isFavorited: true
      });
    });
  });
  describe('Receive favorite action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.favoriteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.FAVORITE_RECIPE_ERROR,
        errorMessage,
        isFavorited: false
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
    favorites
  } = mockData.Recipes;

  const recipeId = 9;
  describe('favorite recipe', () => {
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'recipe sucessfully added to favorite',
            data: favorites,
            type: 1
          }
        });
      });

      const expectedActions = [
        actions.favoriteRecipeRequest(recipeId),
        actions.favoriteRecipeSuccess(recipeId, 'recipe sucessfully added to favorite', 1)
      ];

      await store.dispatch(favoriteRecipeAction(recipeId));
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
      actions.favoriteRecipeRequest(),
      actions.favoriteRecipeError('Login to continue')
    ];

    await store.dispatch(favoriteRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
