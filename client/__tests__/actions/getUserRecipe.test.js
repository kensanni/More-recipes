import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getUserRecipeAction from '../../actionController/getUserRecipe';
import mockData from '../__mocks__/recipeData.json';
import * as actions from '../../actions/getUserRecipeAction';
import localStorage from '../__mocks__/localStorage';

window.localStorage = localStorage;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
} = mockData.Recipes;

describe('Get user recipes Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const actionResults = actions.getUserRecipeRequest();
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_REQUEST,
        isFetched: false,
        isFetching: true
      });
    });
  });
  describe('Receive get user recipes action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeData = [];
      const page = [];
      const count = null;
      const actionResults = actions.getUserRecipeSuccessful(recipeData, page, count);
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_SUCCESSFUL,
        isFetched: true,
        isFetching: false,
        recipeData,
        page,
        count
      });
    });
  });
  describe('Receive get user recipes action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getUserRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_USER_RECIPE_ERROR,
        isFetched: false,
        isFetching: false,
        errorMessage
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
      actions.getUserRecipeRequest(pages),
      actions.getUserRecipeSuccessful([addRecipe], pages)
    ];

    await store.dispatch(getUserRecipeAction(pages));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches error for a failed request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            message: 'No recipe found'
          }
        }
      });
    });

    const expectedActions = [
      actions.getUserRecipeRequest(),
      actions.getUserRecipeError('No recipe found')
    ];

    await store.dispatch(getUserRecipeAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

