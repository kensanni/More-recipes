import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../Helpers/helper';
import addRecipeAction from '../../actionController/addRecipe';
import mockData from '../mockData/recipeData.json';
import * as actions from '../../actions/addRecipeAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const {
  addRecipe,
  invalidRecipe
} = mockData.Recipes;

describe('Add recipe Action', () => {
  describe('Initiate add recipe action request', () => {
    it('should create an action to initiate a request', () => {
      const recipeData = {};
      const actionResults = actions.addRecipeRequest(recipeData);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_REQUEST,
        recipeData,
        isAdded: false,
      });
    });
  });
  describe('Receive add recipe action response', () => {
    it('should create an action to receive a successful response', () => {
      const responseMessage = 'Recipe successfully added';
      const newRecipeData = {};
      const actionResults = actions.addRecipeSuccess(responseMessage, newRecipeData);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_SUCCESSFUL,
        responseMessage,
        newRecipeData,
        isAdded: true,
      });
    });
  });
  describe('Receive add recipe action error response', () => {
    it('should create an action to receive an error response', () => {
      const errorMessage = '';
      const actionResults = actions.addRecipeError(errorMessage);
      expect(actionResults).toEqual({
        type: actions.ADD_RECIPE_ERROR,
        errorMessage,
        isAdded: false,
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

  describe('AddRecipe', () => {
    it.only('dispatches successful action for a successful request', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            message: 'Recipe successfully created',
            data: addRecipe
          }
        });
      });

      global.$ = () => ({ modal: jest.fn() });

      const expectedActions = [
        actions.addRecipeRequest(addRecipe),
        actions.addRecipeSuccess('Recipe successfully created', addRecipe)
      ];

      await store.dispatch(addRecipeAction(addRecipe));
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
                message: 'All fields are required'
              }
            ]
          }
        }
      });
    });

    const expectedActions = [
      actions.addRecipeRequest(invalidRecipe),
      actions.addRecipeError('All fields are required')
    ];

    await store.dispatch(addRecipeAction(invalidRecipe));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
