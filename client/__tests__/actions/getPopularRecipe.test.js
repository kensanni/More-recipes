import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getPopularRecipeAction from '../../actionController/getPopularRecipe';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/getPopularRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
} = mockData.Recipes;

describe('Get popular recipe Action', () => {
  describe('Initiate get popular recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getPopularRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_REQUEST,
        isFetched: false
      });
    });
  });
  describe('Receive get popular recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const popularRecipesData = [];
      const actionResults = actions.getPopularRecipeSuccess(popularRecipesData);
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_SUCCESSFUL,
        popularRecipesData,
        isFetched: true
      });
    });
  });
  describe('Receive get popular recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getPopularRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_POPULAR_RECIPE_ERROR,
        errorMessage,
        isFetched: false,
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

  describe('get popular recipes', () => {
    it('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            recipesData: [addRecipe]
          }
        });
      });

      const expectedActions = [
        actions.getPopularRecipeRequest(),
        actions.getPopularRecipeSuccess([addRecipe])
      ];

      await store.dispatch(getPopularRecipeAction([addRecipe]));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches error for a failed request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject([
        {
          message: 'No recipe found'
        }
      ]);
    });

    const expectedActions = [
      actions.getPopularRecipeRequest(),
      actions.getPopularRecipeError('No recipe found')
    ];

    await store.dispatch(getPopularRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
