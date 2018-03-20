import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getRecipeAction from '../../actionController/getRecipe';
import mockData from '../mockData/recipeData.json';
import * as actions from '../../actions/getRecipeAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
} = mockData.Recipes;

describe('Get recipe Action', () => {
  describe('Initiate get recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_REQUEST,
        isFetched: false,
      });
    });
  });
  describe('Receive get recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const page = null;
      const actionResults = actions.getRecipeSuccess(recipeData, page);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_SUCCESSFUL,
        recipeData,
        isFetched: true,
        page
      });
    });
  });
  describe('Receive get recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_ERROR,
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
  it('dispatches success for successful request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipesData: [
            addRecipe
          ],
          pages
        }
      });
    });

    const expectedActions = [
      actions.getRecipeRequest(pages),
      actions.getRecipeSuccess([addRecipe], pages)
    ];

    await store.dispatch(getRecipeAction(pages));
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
      actions.getRecipeRequest(20),
      actions.getRecipeError('No recipe found')
    ];

    await store.dispatch(getRecipeAction(20));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

