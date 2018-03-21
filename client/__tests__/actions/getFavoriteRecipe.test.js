import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getFavoriteRecipeAction from '../../actionController/getFavoriteRecipe';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/getFavoriteRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  validRecipe,
} = mockData.Recipes;

describe('Get favorite recipe Action', () => {
  describe('Initiate favorite recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getFavoriteRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_REQUEST,
        isFetched: false
      });
    });
  });
  describe('Receive get favorite recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const count = null;
      const page = null;
      const actionResults = actions.getFavoriteRecipeSuccessful(recipeData, page, count);
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_SUCCESSFUL,
        recipeData,
        page,
        count,
        isFetched: true
      });
    });
  });
  describe('Receive get favorite recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getFavoriteRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_FAVORITE_RECIPE_ERROR,
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

  const pages = 0;
  const count = 0;
  const userId = 1;

  it('dispatches successful', async () => {
    const recipeData = {
      recipeData: {
        recipeData: [validRecipe]
      },
      pages: 0,
      count: 0
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipeData: {
            recipeData: [validRecipe],
          },
          pages,
          count,
        },
      });
    });

    const expectedActions = [
      actions.getFavoriteRecipeRequest(),
      actions.getFavoriteRecipeSuccessful(recipeData, pages, count)
    ];

    await store.dispatch(getFavoriteRecipeAction(userId, pages));
    expect(store.getActions()).toEqual(expectedActions);
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
      actions.getFavoriteRecipeRequest(),
      actions.getFavoriteRecipeError('No recipe found')
    ];

    await store.dispatch(getFavoriteRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

