import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import getRecipeDetailsAction from '../../actionController/getRecipeDetails';
import mockData from '../mockData/recipeData.json';
import * as actions from '../../actions/getRecipeDetailsAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
} = mockData.Recipes;

describe('Get recipe details recipe Action', () => {
  describe('Initiate get recipe details action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeId = null;
      const actionResults = actions.getRecipeDetailsRequest(recipeId);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_REQUEST,
        recipeId,
        isFetched: false
      });
    });
  });
  describe('Receive get recipe details action response', () => {
    it('should create an action to receive a successful response', () => {
      const recipeDetails = {};
      const actionResults = actions.getRecipeDetailsSuccessful(recipeDetails);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_SUCCESSFUL,
        recipeDetails,
        isFetched: true
      });
    });
  });
  describe('Receive get recipe details action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.getRecipeDetailsError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.GET_RECIPE_DETAILS_ERROR,
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

  const recipeId = 9;

  it('dispatches success for successful request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          recipeData: addRecipe
        }
      });
    });

    const expectedActions = [
      actions.getRecipeDetailsRequest(recipeId),
      actions.getRecipeDetailsSuccessful(addRecipe)
    ];

    await store.dispatch(getRecipeDetailsAction(recipeId));
    expect(store.getActions()).toEqual(expectedActions);
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
      actions.getRecipeDetailsRequest(),
      actions.getRecipeDetailsError('Login to continue')
    ];

    await store.dispatch(getRecipeDetailsAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
